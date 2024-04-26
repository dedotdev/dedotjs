import { $H256, BlockHash } from '@dedot/codecs';
import { u32 } from '@dedot/shape';
import { ChainHeadRuntimeVersion } from '@dedot/specs';
import { RpcV2, VersionedGenericSubstrateApi } from '@dedot/types';
import { assert, concatU8a, HexString, twox64Concat, u8aToHex, xxhashAsU8a } from '@dedot/utils';
import type { SubstrateApi } from '../chaintypes/index.js';
import { RuntimeApiExecutorV2, StorageQueryExecutorV2 } from '../executor/index.js';
import { ChainHead, ChainSpec, Transaction, TransactionWatch } from '../json-rpc/index.js';
import { newProxyChain } from '../proxychain.js';
import type { ApiOptions, NetworkEndpoint, TxBroadcaster } from '../types.js';
import { BaseSubstrateClient, ensurePresence } from './BaseSubstrateClient.js';

/**
 * @name DedotClient
 * @description New promised-based API Client for Polkadot & Substrate based on JSON-RPC V2
 *
 * __Unstable, use with caution.__
 */
export class DedotClient<
  ChainApi extends VersionedGenericSubstrateApi = SubstrateApi,
> extends BaseSubstrateClient<ChainApi> {
  _chainHead?: ChainHead;
  _chainSpec?: ChainSpec;
  _txBroadcaster?: TxBroadcaster;

  /**
   * Use factory methods (`create`, `new`) to create `DedotClient` instances.
   *
   * @param options
   */
  constructor(options: ApiOptions | NetworkEndpoint) {
    super('v2', options);
  }

  /**
   * Factory method to create a new DedotClient instance
   *
   * @param options
   */
  static async create<ChainApi extends VersionedGenericSubstrateApi = SubstrateApi>(
    options: ApiOptions | NetworkEndpoint,
  ): Promise<DedotClient<ChainApi>> {
    return new DedotClient<ChainApi>(options).connect();
  }

  /**
   * Alias for __DedotClient.create__
   *
   * @param options
   */
  static async new<ChainApi extends VersionedGenericSubstrateApi = SubstrateApi>(
    options: ApiOptions | NetworkEndpoint,
  ): Promise<DedotClient<ChainApi>> {
    return DedotClient.create(options);
  }

  get chainSpec() {
    return ensurePresence(this._chainSpec);
  }

  get chainHead() {
    return ensurePresence(this._chainHead);
  }

  get txBroadcaster() {
    this.chainHead; // Ensure chain head is initialized
    assert(this._txBroadcaster, 'JSON-RPC method to broadcast transactions is not supported by the server/node.');
    return this._txBroadcaster;
  }

  async #initializeTxBroadcaster(rpcMethods: string[]): Promise<TxBroadcaster | undefined> {
    const tx = new Transaction(this, { rpcMethods });
    if (await tx.supported()) return tx;

    const txWatch = new TransactionWatch(this, { rpcMethods });
    if (await txWatch.supported()) return txWatch;
  }

  /**
   * Initialize APIs before usage
   */
  protected override async doInitialize() {
    const rpcMethods: string[] = (await this.rpc.rpc_methods()).methods;

    this._chainHead = new ChainHead(this, { rpcMethods });
    this._chainSpec = new ChainSpec(this, { rpcMethods });
    this._txBroadcaster = await this.#initializeTxBroadcaster(rpcMethods);

    // Fetching node information
    let [_, genesisHash] = await Promise.all([
      this.chainHead.follow(),
      this.chainSpec.genesisHash().catch(() => undefined),
    ]);

    this._genesisHash = genesisHash || (await this.#getGenesisHashFallback());
    this._runtimeVersion = this.chainHead.bestRuntimeVersion;

    let metadata;
    if (await this.shouldPreloadMetadata()) {
      metadata = await this.fetchMetadata();
    }

    await this.setupMetadata(metadata);
    this.subscribeRuntimeUpgrades();
  }

  /**
   * Ref: https://github.com/paritytech/polkadot-sdk/blob/bbd51ce867967f71657b901f1a956ad4f75d352e/substrate/frame/system/src/lib.rs#L909-L913
   * @private
   */
  async #getGenesisHashFallback(): Promise<HexString> {
    const pallet = xxhashAsU8a('System', 128);
    const item = xxhashAsU8a('BlockHash', 128);
    const blockHeightAt0 = twox64Concat(u32.encode(0));

    const key = u8aToHex(concatU8a(pallet, item, blockHeightAt0));

    const storageValue = await this.chainHead.storage([{ type: 'value', key }]);

    const rawGenesisHash = storageValue.at(0)?.value;
    assert(rawGenesisHash, 'Genesis hash not found!');

    // Here we assume that in most case the hash is stored as a H256
    return $H256.tryDecode(rawGenesisHash);
  }

  protected subscribeRuntimeUpgrades() {
    this.chainHead.on('bestBlock', this.onRuntimeUpgrade);
  }

  protected unsubscribeRuntimeUpgrades() {
    this.chainHead.off('bestBlock', this.onRuntimeUpgrade);
  }

  protected onRuntimeUpgrade = async (_: BlockHash, newRuntime?: ChainHeadRuntimeVersion) => {
    const runtimeUpgraded = newRuntime && newRuntime.specVersion !== this._runtimeVersion?.specVersion;
    if (!runtimeUpgraded) return;

    this._runtimeVersion = newRuntime;
    const newMetadata = await this.fetchMetadata(undefined, this._runtimeVersion);
    await this.setupMetadata(newMetadata);
  };

  protected override async beforeDisconnect(): Promise<void> {
    this.unsubscribeRuntimeUpgrades();
  }

  protected override onDisconnected = async () => {
    this.unsubscribeRuntimeUpgrades();
  };

  protected override cleanUp() {
    super.cleanUp();
    this._chainHead = undefined;
    this._chainSpec = undefined;
    this._txBroadcaster = undefined;
  }

  override get query(): ChainApi[RpcV2]['query'] {
    return newProxyChain({
      executor: new StorageQueryExecutorV2(this, this.chainHead),
    }) as ChainApi[RpcV2]['query'];
  }

  override get call(): ChainApi[RpcV2]['call'] {
    return this.callAt();
  }

  protected override callAt(blockHash?: BlockHash): ChainApi[RpcV2]['call'] {
    return newProxyChain({
      executor: new RuntimeApiExecutorV2(this, this.chainHead, blockHash),
    }) as ChainApi[RpcV2]['call'];
  }

  // TODO tx, at
}
