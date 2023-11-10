// Generated by @delightfuldot/codegen

import type {
  GenericRpcCalls,
  AsyncMethod,
  Unsub,
  Callback,
  RpcMethods,
  ChainType,
  Health,
  NodeRole,
  PeerInfo,
  ChainProperties,
  SyncState,
  NetworkState,
} from '@delightfuldot/types';
import type {
  Option,
  SignedBlock,
  BlockHash,
  BlockNumber,
  Header,
  Metadata,
  StorageData,
  StorageKeyLike,
  Bytes,
} from '@delightfuldot/codecs';
import type { SpVersionRuntimeVersion } from './types';

export interface RpcCalls extends GenericRpcCalls {
  author: {
    /**
     * @rpcname: author_hasKey
     **/
    hasKey: AsyncMethod;

    /**
     * @rpcname: author_hasSessionKeys
     **/
    hasSessionKeys: AsyncMethod;

    /**
     * @rpcname: author_insertKey
     **/
    insertKey: AsyncMethod;

    /**
     * @rpcname: author_pendingExtrinsics
     **/
    pendingExtrinsics: AsyncMethod;

    /**
     * @rpcname: author_removeExtrinsic
     **/
    removeExtrinsic: AsyncMethod;

    /**
     * @rpcname: author_rotateKeys
     **/
    rotateKeys: AsyncMethod;

    /**
     * @rpcname: author_submitAndWatchExtrinsic
     **/
    submitAndWatchExtrinsic: AsyncMethod;

    /**
     * @rpcname: author_submitExtrinsic
     **/
    submitExtrinsic: AsyncMethod;

    /**
     * @rpcname: author_unwatchExtrinsic
     **/
    unwatchExtrinsic: AsyncMethod;

    [method: string]: AsyncMethod;
  };
  babe: {
    /**
     * @rpcname: babe_epochAuthorship
     **/
    epochAuthorship: AsyncMethod;

    [method: string]: AsyncMethod;
  };
  chainHead: {
    /**
     * @rpcname: chainHead_unstable_body
     **/
    unstable_body: AsyncMethod;

    /**
     * @rpcname: chainHead_unstable_call
     **/
    unstable_call: AsyncMethod;

    /**
     * @rpcname: chainHead_unstable_continue
     **/
    unstable_continue: AsyncMethod;

    /**
     * @rpcname: chainHead_unstable_follow
     **/
    unstable_follow: AsyncMethod;

    /**
     * @rpcname: chainHead_unstable_genesisHash
     **/
    unstable_genesisHash: AsyncMethod;

    /**
     * @rpcname: chainHead_unstable_header
     **/
    unstable_header: AsyncMethod;

    /**
     * @rpcname: chainHead_unstable_stopOperation
     **/
    unstable_stopOperation: AsyncMethod;

    /**
     * @rpcname: chainHead_unstable_storage
     **/
    unstable_storage: AsyncMethod;

    /**
     * @rpcname: chainHead_unstable_unfollow
     **/
    unstable_unfollow: AsyncMethod;

    /**
     * @rpcname: chainHead_unstable_unpin
     **/
    unstable_unpin: AsyncMethod;

    [method: string]: AsyncMethod;
  };
  chainSpec: {
    /**
     * @rpcname: chainSpec_unstable_chainName
     **/
    unstable_chainName: AsyncMethod;

    /**
     * @rpcname: chainSpec_unstable_genesisHash
     **/
    unstable_genesisHash: AsyncMethod;

    /**
     * @rpcname: chainSpec_unstable_properties
     **/
    unstable_properties: AsyncMethod;

    [method: string]: AsyncMethod;
  };
  chain: {
    /**
     * Get header and body of a relay chain block
     *
     * @rpcname: chain_getBlock
     **/
    getBlock(at?: BlockHash): Promise<Option<SignedBlock>>;

    /**
     * Get the block hash for a specific block
     *
     * @rpcname: chain_getBlockHash
     **/
    getBlockHash(blockNumber?: BlockNumber): Promise<Option<BlockHash>>;

    /**
     * Get hash of the last finalized block in the canon chain
     *
     * @rpcname: chain_getFinalizedHead
     **/
    getFinalizedHead(): Promise<BlockHash>;

    /**
     * Retrieves the header for a specific block
     *
     * @rpcname: chain_getHeader
     **/
    getHeader(at?: BlockHash): Promise<Option<Header>>;

    /**
     * All head subscription.
     *
     * @pubsub: chain_allHead, chain_subscribeAllHeads, chain_unsubscribeAllHeads
     **/
    subscribeAllHeads(callback: Callback<Header>): Promise<Unsub>;

    /**
     * Retrieves the best finalized header via subscription
     *
     * @pubsub: chain_finalizedHead, chain_subscribeFinalizedHeads, chain_unsubscribeFinalizedHeads
     **/
    subscribeFinalizedHeads(callback: Callback<Header>): Promise<Unsub>;

    /**
     * Retrieves the best header via subscription
     *
     * @pubsub: chain_newHead, chain_subscribeNewHeads, chain_unsubscribeNewHeads
     **/
    subscribeNewHeads(callback: Callback<Header>): Promise<Unsub>;

    [method: string]: AsyncMethod;
  };
  childstate: {
    /**
     * @rpcname: childstate_getKeys
     **/
    getKeys: AsyncMethod;

    /**
     * @rpcname: childstate_getKeysPaged
     **/
    getKeysPaged: AsyncMethod;

    /**
     * @rpcname: childstate_getKeysPagedAt
     **/
    getKeysPagedAt: AsyncMethod;

    /**
     * @rpcname: childstate_getStorage
     **/
    getStorage: AsyncMethod;

    /**
     * @rpcname: childstate_getStorageEntries
     **/
    getStorageEntries: AsyncMethod;

    /**
     * @rpcname: childstate_getStorageHash
     **/
    getStorageHash: AsyncMethod;

    /**
     * @rpcname: childstate_getStorageSize
     **/
    getStorageSize: AsyncMethod;

    [method: string]: AsyncMethod;
  };
  dev: {
    /**
     * @rpcname: dev_getBlockStats
     **/
    getBlockStats: AsyncMethod;

    [method: string]: AsyncMethod;
  };
  grandpa: {
    /**
     * @rpcname: grandpa_proveFinality
     **/
    proveFinality: AsyncMethod;

    /**
     * @rpcname: grandpa_roundState
     **/
    roundState: AsyncMethod;

    /**
     * @rpcname: grandpa_subscribeJustifications
     **/
    subscribeJustifications: AsyncMethod;

    /**
     * @rpcname: grandpa_unsubscribeJustifications
     **/
    unsubscribeJustifications: AsyncMethod;

    [method: string]: AsyncMethod;
  };
  mmr: {
    /**
     * @rpcname: mmr_generateProof
     **/
    generateProof: AsyncMethod;

    /**
     * @rpcname: mmr_root
     **/
    root: AsyncMethod;

    /**
     * @rpcname: mmr_verifyProof
     **/
    verifyProof: AsyncMethod;

    /**
     * @rpcname: mmr_verifyProofStateless
     **/
    verifyProofStateless: AsyncMethod;

    [method: string]: AsyncMethod;
  };
  offchain: {
    /**
     * @rpcname: offchain_localStorageGet
     **/
    localStorageGet: AsyncMethod;

    /**
     * @rpcname: offchain_localStorageSet
     **/
    localStorageSet: AsyncMethod;

    [method: string]: AsyncMethod;
  };
  payment: {
    /**
     * @rpcname: payment_queryFeeDetails
     **/
    queryFeeDetails: AsyncMethod;

    /**
     * @rpcname: payment_queryInfo
     **/
    queryInfo: AsyncMethod;

    [method: string]: AsyncMethod;
  };
  rpc: {
    /**
     * Retrieves the list of RPC methods that are exposed by the node
     *
     * @rpcname: rpc_methods
     **/
    methods(): Promise<RpcMethods>;

    [method: string]: AsyncMethod;
  };
  state: {
    /**
     * @rpcname: state_call
     **/
    call: AsyncMethod;

    /**
     * @rpcname: state_callAt
     **/
    callAt: AsyncMethod;

    /**
     * @rpcname: state_getChildReadProof
     **/
    getChildReadProof: AsyncMethod;

    /**
     * @rpcname: state_getKeys
     **/
    getKeys: AsyncMethod;

    /**
     * @rpcname: state_getKeysPaged
     **/
    getKeysPaged: AsyncMethod;

    /**
     * @rpcname: state_getKeysPagedAt
     **/
    getKeysPagedAt: AsyncMethod;

    /**
     * Returns the runtime metadata
     *
     * @rpcname: state_getMetadata
     **/
    getMetadata(at?: BlockHash): Promise<Metadata>;

    /**
     * @rpcname: state_getPairs
     **/
    getPairs: AsyncMethod;

    /**
     * @rpcname: state_getReadProof
     **/
    getReadProof: AsyncMethod;

    /**
     * Get the runtime version.
     *
     * @rpcname: state_getRuntimeVersion
     **/
    getRuntimeVersion(): Promise<SpVersionRuntimeVersion>;

    /**
     * Returns a storage entry at a specific block's state.
     *
     * @rpcname: state_getStorage
     **/
    getStorage(key: StorageKeyLike, at?: BlockHash): Promise<Option<StorageData>>;

    /**
     * @rpcname: state_getStorageHash
     **/
    getStorageHash: AsyncMethod;

    /**
     * @rpcname: state_getStorageHashAt
     **/
    getStorageHashAt: AsyncMethod;

    /**
     * @rpcname: state_getStorageSize
     **/
    getStorageSize: AsyncMethod;

    /**
     * @rpcname: state_getStorageSizeAt
     **/
    getStorageSizeAt: AsyncMethod;

    /**
     * @rpcname: state_queryStorage
     **/
    queryStorage: AsyncMethod;

    /**
     * @rpcname: state_queryStorageAt
     **/
    queryStorageAt: AsyncMethod;

    /**
     * New runtime version subscription
     *
     * @pubsub: state_runtimeVersion, state_subscribeRuntimeVersion, state_unsubscribeRuntimeVersion
     **/
    subscribeRuntimeVersion(callback: Callback<SpVersionRuntimeVersion>): Promise<Unsub>;

    /**
     * @rpcname: state_subscribeStorage
     **/
    subscribeStorage: AsyncMethod;

    /**
     * @rpcname: state_traceBlock
     **/
    traceBlock: AsyncMethod;

    /**
     * @rpcname: state_trieMigrationStatus
     **/
    trieMigrationStatus: AsyncMethod;

    /**
     * @rpcname: state_unsubscribeStorage
     **/
    unsubscribeStorage: AsyncMethod;

    [method: string]: AsyncMethod;
  };
  statement: {
    /**
     * @rpcname: statement_broadcasts
     **/
    broadcasts: AsyncMethod;

    /**
     * @rpcname: statement_dump
     **/
    dump: AsyncMethod;

    /**
     * @rpcname: statement_posted
     **/
    posted: AsyncMethod;

    /**
     * @rpcname: statement_postedClear
     **/
    postedClear: AsyncMethod;

    /**
     * @rpcname: statement_remove
     **/
    remove: AsyncMethod;

    /**
     * @rpcname: statement_submit
     **/
    submit: AsyncMethod;

    [method: string]: AsyncMethod;
  };
  syncstate: {
    /**
     * Returns the JSON-serialized chainspec running the node, with a sync state.
     *
     * @rpcname: sync_state_genSyncSpec
     **/
    genSyncSpec(raw: boolean): Promise<Record<string, any>>;

    [method: string]: AsyncMethod;
  };
  system: {
    /**
     * Returns the next valid index (aka nonce) for given account.
     *
     * This method takes into consideration all pending transactions
     * currently in the pool and if no transactions are found in the pool
     * it fallbacks to query the index from the runtime (aka. state nonce).
     *
     * @rpcname: system_accountNextIndex
     **/
    accountNextIndex(address: string): Promise<number>;

    /**
     * Adds the supplied directives to the current log filter
     *
     * The syntax is identical to the CLI `<target>=<level>`:
     *
     * `sync=debug,state=trace`
     *
     * @rpcname: system_addLogFilter
     **/
    addLogFilter(directives: string): Promise<void>;

    /**
     * Adds a reserved peer. Returns the empty string or an error. The string
     * parameter should encode a `p2p` multiaddr.
     *
     * `/ip4/198.51.100.19/tcp/30333/p2p/QmSk5HQbn6LhUwDiNMseVUjuRYhEtYj4aUZ6WfWoGURpdV`
     * is an example of a valid, passing multiaddr with PeerId attached.
     *
     * @rpcname: system_addReservedPeer
     **/
    addReservedPeer(peer: string): Promise<void>;

    /**
     * Get the chain's name. Given as a string identifier.
     *
     * @rpcname: system_chain
     **/
    chain(): Promise<string>;

    /**
     * Get the chain's type.
     *
     * @rpcname: system_chainType
     **/
    chainType(): Promise<ChainType>;

    /**
     * Dry run an extrinsic at a given block. Return SCALE encoded ApplyExtrinsicResult.
     *
     * @rpcname: system_dryRun
     **/
    dryRun(extrinsic: Bytes, at?: BlockHash): Promise<Bytes>;

    /**
     * Return health status of the node.
     *
     * Node is considered healthy if it is:
     * - connected to some peers (unless running in dev mode)
     * - not performing a major sync
     *
     * @rpcname: system_health
     **/
    health(): Promise<Health>;

    /**
     * Returns the multi-addresses that the local node is listening on
     *
     * The addresses include a trailing `/p2p/` with the local PeerId, and are thus suitable to
     * be passed to `addReservedPeer` or as a bootnode address for example.
     *
     * @rpcname: system_localListenAddresses
     **/
    localListenAddresses(): Promise<Array<string>>;

    /**
     * Returns the base58-encoded PeerId of the node.
     *
     * @rpcname: system_localPeerId
     **/
    localPeerId(): Promise<string>;

    /**
     * Get the node's implementation name. Plain old string.
     *
     * @rpcname: system_name
     **/
    name(): Promise<string>;

    /**
     * Returns the roles the node is running as
     *
     * @rpcname: system_nodeRoles
     **/
    nodeRoles(): Promise<Array<NodeRole>>;

    /**
     * Returns the currently connected peers
     *
     * @rpcname: system_peers
     **/
    peers(): Promise<Array<PeerInfo>>;

    /**
     * Get a custom set of properties as a JSON object, defined in the chain spec.
     *
     * @rpcname: system_properties
     **/
    properties(): Promise<ChainProperties>;

    /**
     * Remove a reserved peer. Returns the empty string or an error. The string
     * should encode only the PeerId e.g. `QmSk5HQbn6LhUwDiNMseVUjuRYhEtYj4aUZ6WfWoGURpdV`.
     *
     * @rpcname: system_removeReservedPeer
     **/
    removeReservedPeer(peerId: string): Promise<void>;

    /**
     * Returns the list of reserved peers
     *
     * @rpcname: system_reservedPeers
     **/
    reservedPeers(): Promise<Array<string>>;

    /**
     * Resets the log filter to Substrate defaults
     *
     * @rpcname: system_resetLogFilter
     **/
    resetLogFilter(): Promise<void>;

    /**
     * Returns the state of the syncing of the node: starting block, current best block, highest known block.
     *
     * @rpcname: system_syncState
     **/
    syncState(): Promise<SyncState>;

    /**
     * Returns current state of the network.
     *
     * **Warning**: This API is not stable. Please do not programmatically interpret its output,
     * as its format might change at any time.
     *
     * @rpcname: system_unstable_networkState
     **/
    unstable_networkState(): Promise<NetworkState>;

    /**
     * Get the node implementation's version. Should be a semver string.
     *
     * @rpcname: system_version
     **/
    version(): Promise<string>;

    [method: string]: AsyncMethod;
  };
  transaction: {
    /**
     * @rpcname: transaction_unstable_submitAndWatch
     **/
    unstable_submitAndWatch: AsyncMethod;

    /**
     * @rpcname: transaction_unstable_unwatch
     **/
    unstable_unwatch: AsyncMethod;

    [method: string]: AsyncMethod;
  };
}
