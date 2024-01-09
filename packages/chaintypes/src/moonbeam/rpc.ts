// Generated by @delightfuldot/codegen

import type {
  GenericRpcCalls,
  Unsub,
  Callback,
  GenericRpcCall,
  ExtrinsicOrHash,
  TransactionStatus,
  StorageKind,
  FeeDetails,
  RuntimeDispatchInfo,
  RpcMethods,
  ReadProof,
  RuntimeVersion,
  StorageChangeSet,
  TraceBlockResponse,
  ChainType,
  Health,
  NodeRole,
  PeerInfo,
  ChainProperties,
  SyncState,
  NetworkState,
} from '@delightfuldot/types';
import type {
  Bytes,
  Hash,
  Option,
  SignedBlock,
  BlockHash,
  BlockNumber,
  Header,
  PrefixedStorageKey,
  StorageKey,
  Metadata,
  StorageData,
  ApplyExtrinsicResult,
} from '@delightfuldot/codecs';

export interface RpcCalls extends GenericRpcCalls {
  author: {
    /**
     * Checks if the keystore has private keys for the given public key and key type. Returns `true` if a private key could be found.
     *
     * @rpcname: author_hasKey
     **/
    hasKey: GenericRpcCall<(publicKey: Bytes, keyType: string) => Promise<boolean>>;

    /**
     * Checks if the keystore has private keys for the given session public keys. `session_keys` is the SCALE encoded session keys object from the runtime. Returns `true` iff all private keys could be found.
     *
     * @rpcname: author_hasSessionKeys
     **/
    hasSessionKeys: GenericRpcCall<(sessionKeys: Bytes) => Promise<boolean>>;

    /**
     * Insert a key into the keystore.
     *
     * @rpcname: author_insertKey
     **/
    insertKey: GenericRpcCall<(keyType: string, suri: string, publicKey: Bytes) => Promise<void>>;

    /**
     * Returns all pending extrinsics, potentially grouped by sender.
     *
     * @rpcname: author_pendingExtrinsics
     **/
    pendingExtrinsics: GenericRpcCall<() => Promise<Array<Bytes>>>;

    /**
     * Remove given extrinsic from the pool and temporarily ban it to prevent reimporting.
     *
     * @rpcname: author_removeExtrinsic
     **/
    removeExtrinsic: GenericRpcCall<(bytesOrHash: Array<ExtrinsicOrHash>) => Promise<Array<Hash>>>;

    /**
     * Generate new session keys and returns the corresponding public keys.
     *
     * @rpcname: author_rotateKeys
     **/
    rotateKeys: GenericRpcCall<() => Promise<Bytes>>;

    /**
     * Submit and subscribe to watch an extrinsic until unsubscribed
     *
     * @pubsub: author_extrinsicUpdate, author_submitAndWatchExtrinsic, author_unwatchExtrinsic
     **/
    submitAndWatchExtrinsic: GenericRpcCall<
      (extrinsic: Bytes, callback: Callback<TransactionStatus>) => Promise<Unsub>
    >;

    /**
     * Submit hex-encoded extrinsic for inclusion in block.
     *
     * @rpcname: author_submitExtrinsic
     **/
    submitExtrinsic: GenericRpcCall<(extrinsic: Bytes) => Promise<Hash>>;

    [method: string]: GenericRpcCall;
  };
  chainHead: {
    /**
     * @rpcname: chainHead_unstable_body
     **/
    unstable_body: GenericRpcCall;

    /**
     * @rpcname: chainHead_unstable_call
     **/
    unstable_call: GenericRpcCall;

    /**
     * @rpcname: chainHead_unstable_follow
     **/
    unstable_follow: GenericRpcCall;

    /**
     * @rpcname: chainHead_unstable_genesisHash
     **/
    unstable_genesisHash: GenericRpcCall;

    /**
     * @rpcname: chainHead_unstable_header
     **/
    unstable_header: GenericRpcCall;

    /**
     * @rpcname: chainHead_unstable_stopBody
     **/
    unstable_stopBody: GenericRpcCall;

    /**
     * @rpcname: chainHead_unstable_stopCall
     **/
    unstable_stopCall: GenericRpcCall;

    /**
     * @rpcname: chainHead_unstable_stopStorage
     **/
    unstable_stopStorage: GenericRpcCall;

    /**
     * @rpcname: chainHead_unstable_storage
     **/
    unstable_storage: GenericRpcCall;

    /**
     * @rpcname: chainHead_unstable_unfollow
     **/
    unstable_unfollow: GenericRpcCall;

    /**
     * @rpcname: chainHead_unstable_unpin
     **/
    unstable_unpin: GenericRpcCall;

    [method: string]: GenericRpcCall;
  };
  chain: {
    /**
     * Get header and body of a relay chain block
     *
     * @rpcname: chain_getBlock
     **/
    getBlock: GenericRpcCall<(at?: BlockHash) => Promise<Option<SignedBlock>>>;

    /**
     * Get the block hash for a specific block
     *
     * @rpcname: chain_getBlockHash
     **/
    getBlockHash: GenericRpcCall<(blockNumber?: BlockNumber) => Promise<Option<BlockHash>>>;

    /**
     * Get hash of the last finalized block in the canon chain
     *
     * @rpcname: chain_getFinalizedHead
     **/
    getFinalizedHead: GenericRpcCall<() => Promise<BlockHash>>;

    /**
     * Retrieves the header for a specific block
     *
     * @rpcname: chain_getHeader
     **/
    getHeader: GenericRpcCall<(at?: BlockHash) => Promise<Option<Header>>>;

    /**
     * All head subscription.
     *
     * @pubsub: chain_allHead, chain_subscribeAllHeads, chain_unsubscribeAllHeads
     **/
    subscribeAllHeads: GenericRpcCall<(callback: Callback<Header>) => Promise<Unsub>>;

    /**
     * Retrieves the best finalized header via subscription
     *
     * @pubsub: chain_finalizedHead, chain_subscribeFinalizedHeads, chain_unsubscribeFinalizedHeads
     **/
    subscribeFinalizedHeads: GenericRpcCall<(callback: Callback<Header>) => Promise<Unsub>>;

    /**
     * Retrieves the best header via subscription
     *
     * @pubsub: chain_newHead, chain_subscribeNewHeads, chain_unsubscribeNewHeads
     **/
    subscribeNewHeads: GenericRpcCall<(callback: Callback<Header>) => Promise<Unsub>>;

    [method: string]: GenericRpcCall;
  };
  childstate: {
    /**
     * @rpcname: childstate_getKeys
     **/
    getKeys: GenericRpcCall;

    /**
     * @rpcname: childstate_getKeysPaged
     **/
    getKeysPaged: GenericRpcCall;

    /**
     * @rpcname: childstate_getKeysPagedAt
     **/
    getKeysPagedAt: GenericRpcCall;

    /**
     * @rpcname: childstate_getStorage
     **/
    getStorage: GenericRpcCall;

    /**
     * @rpcname: childstate_getStorageEntries
     **/
    getStorageEntries: GenericRpcCall;

    /**
     * @rpcname: childstate_getStorageHash
     **/
    getStorageHash: GenericRpcCall;

    /**
     * @rpcname: childstate_getStorageSize
     **/
    getStorageSize: GenericRpcCall;

    [method: string]: GenericRpcCall;
  };
  eth: {
    /**
     * @rpcname: eth_accounts
     **/
    accounts: GenericRpcCall;

    /**
     * @rpcname: eth_blockNumber
     **/
    blockNumber: GenericRpcCall;

    /**
     * @rpcname: eth_call
     **/
    call: GenericRpcCall;

    /**
     * @rpcname: eth_chainId
     **/
    chainId: GenericRpcCall;

    /**
     * @rpcname: eth_coinbase
     **/
    coinbase: GenericRpcCall;

    /**
     * @rpcname: eth_estimateGas
     **/
    estimateGas: GenericRpcCall;

    /**
     * @rpcname: eth_feeHistory
     **/
    feeHistory: GenericRpcCall;

    /**
     * @rpcname: eth_gasPrice
     **/
    gasPrice: GenericRpcCall;

    /**
     * @rpcname: eth_getBalance
     **/
    getBalance: GenericRpcCall;

    /**
     * @rpcname: eth_getBlockByHash
     **/
    getBlockByHash: GenericRpcCall;

    /**
     * @rpcname: eth_getBlockByNumber
     **/
    getBlockByNumber: GenericRpcCall;

    /**
     * @rpcname: eth_getBlockTransactionCountByHash
     **/
    getBlockTransactionCountByHash: GenericRpcCall;

    /**
     * @rpcname: eth_getBlockTransactionCountByNumber
     **/
    getBlockTransactionCountByNumber: GenericRpcCall;

    /**
     * @rpcname: eth_getCode
     **/
    getCode: GenericRpcCall;

    /**
     * @rpcname: eth_getFilterChanges
     **/
    getFilterChanges: GenericRpcCall;

    /**
     * @rpcname: eth_getFilterLogs
     **/
    getFilterLogs: GenericRpcCall;

    /**
     * @rpcname: eth_getLogs
     **/
    getLogs: GenericRpcCall;

    /**
     * @rpcname: eth_getStorageAt
     **/
    getStorageAt: GenericRpcCall;

    /**
     * @rpcname: eth_getTransactionByBlockHashAndIndex
     **/
    getTransactionByBlockHashAndIndex: GenericRpcCall;

    /**
     * @rpcname: eth_getTransactionByBlockNumberAndIndex
     **/
    getTransactionByBlockNumberAndIndex: GenericRpcCall;

    /**
     * @rpcname: eth_getTransactionByHash
     **/
    getTransactionByHash: GenericRpcCall;

    /**
     * @rpcname: eth_getTransactionCount
     **/
    getTransactionCount: GenericRpcCall;

    /**
     * @rpcname: eth_getTransactionReceipt
     **/
    getTransactionReceipt: GenericRpcCall;

    /**
     * @rpcname: eth_getUncleByBlockHashAndIndex
     **/
    getUncleByBlockHashAndIndex: GenericRpcCall;

    /**
     * @rpcname: eth_getUncleByBlockNumberAndIndex
     **/
    getUncleByBlockNumberAndIndex: GenericRpcCall;

    /**
     * @rpcname: eth_getUncleCountByBlockHash
     **/
    getUncleCountByBlockHash: GenericRpcCall;

    /**
     * @rpcname: eth_getUncleCountByBlockNumber
     **/
    getUncleCountByBlockNumber: GenericRpcCall;

    /**
     * @rpcname: eth_getWork
     **/
    getWork: GenericRpcCall;

    /**
     * @rpcname: eth_hashrate
     **/
    hashrate: GenericRpcCall;

    /**
     * @rpcname: eth_maxPriorityFeePerGas
     **/
    maxPriorityFeePerGas: GenericRpcCall;

    /**
     * @rpcname: eth_mining
     **/
    mining: GenericRpcCall;

    /**
     * @rpcname: eth_newBlockFilter
     **/
    newBlockFilter: GenericRpcCall;

    /**
     * @rpcname: eth_newFilter
     **/
    newFilter: GenericRpcCall;

    /**
     * @rpcname: eth_newPendingTransactionFilter
     **/
    newPendingTransactionFilter: GenericRpcCall;

    /**
     * @rpcname: eth_protocolVersion
     **/
    protocolVersion: GenericRpcCall;

    /**
     * @rpcname: eth_sendRawTransaction
     **/
    sendRawTransaction: GenericRpcCall;

    /**
     * @rpcname: eth_sendTransaction
     **/
    sendTransaction: GenericRpcCall;

    /**
     * @rpcname: eth_submitHashrate
     **/
    submitHashrate: GenericRpcCall;

    /**
     * @rpcname: eth_submitWork
     **/
    submitWork: GenericRpcCall;

    /**
     * @rpcname: eth_subscribe
     **/
    subscribe: GenericRpcCall;

    /**
     * @rpcname: eth_syncing
     **/
    syncing: GenericRpcCall;

    /**
     * @rpcname: eth_uninstallFilter
     **/
    uninstallFilter: GenericRpcCall;

    /**
     * @rpcname: eth_unsubscribe
     **/
    unsubscribe: GenericRpcCall;

    [method: string]: GenericRpcCall;
  };
  moon: {
    /**
     * @rpcname: moon_isBlockFinalized
     **/
    isBlockFinalized: GenericRpcCall;

    /**
     * @rpcname: moon_isTxFinalized
     **/
    isTxFinalized: GenericRpcCall;

    [method: string]: GenericRpcCall;
  };
  net: {
    /**
     * @rpcname: net_listening
     **/
    listening: GenericRpcCall;

    /**
     * @rpcname: net_peerCount
     **/
    peerCount: GenericRpcCall;

    /**
     * @rpcname: net_version
     **/
    version: GenericRpcCall;

    [method: string]: GenericRpcCall;
  };
  offchain: {
    /**
     * Get offchain local storage under given key and prefix.
     *
     * @rpcname: offchain_localStorageGet
     **/
    localStorageGet: GenericRpcCall<(kind: StorageKind, key: Bytes) => Promise<Option<Bytes>>>;

    /**
     * Set offchain local storage under given key and prefix.
     *
     * @rpcname: offchain_localStorageSet
     **/
    localStorageSet: GenericRpcCall<(kind: StorageKind, key: Bytes, value: Bytes) => Promise<void>>;

    [method: string]: GenericRpcCall;
  };
  payment: {
    /**
     * Query the detailed fee of a given encoded extrinsic
     *
     * @rpcname: payment_queryFeeDetails
     **/
    queryFeeDetails: GenericRpcCall<(extrinsic: Bytes, at?: BlockHash) => Promise<FeeDetails>>;

    /**
     * Retrieves the fee information for an encoded extrinsic
     *
     * @rpcname: payment_queryInfo
     **/
    queryInfo: GenericRpcCall<(extrinsic: Bytes, at?: BlockHash) => Promise<RuntimeDispatchInfo>>;

    [method: string]: GenericRpcCall;
  };
  rpc: {
    /**
     * Retrieves the list of RPC methods that are exposed by the node
     *
     * @rpcname: rpc_methods
     **/
    methods: GenericRpcCall<() => Promise<RpcMethods>>;

    [method: string]: GenericRpcCall;
  };
  state: {
    /**
     * Call a method from the runtime API at a block's state.
     *
     * @rpcname: state_call
     **/
    call: GenericRpcCall<(method: string, data: Bytes, at?: BlockHash) => Promise<Bytes>>;

    /**
     * Returns proof of storage for child key entries at a specific block state.
     *
     * @rpcname: state_getChildReadProof
     **/
    getChildReadProof: GenericRpcCall<
      (childStorageKey: PrefixedStorageKey, keys: Array<StorageKey>, at?: BlockHash) => Promise<ReadProof>
    >;

    /**
     * Returns the keys with prefix, leave empty to get all the keys.
     *
     * @rpcname: state_getKeys
     * @deprecated: Please use `getKeysPaged` with proper paging support
     **/
    getKeys: GenericRpcCall<(prefix: StorageKey, at?: BlockHash) => Promise<Array<StorageKey>>>;

    /**
     * Returns the keys with prefix with pagination support. Up to `count` keys will be returned. If `start_key` is passed, return next keys in storage in lexicographic order.
     *
     * @rpcname: state_getKeysPaged
     **/
    getKeysPaged: GenericRpcCall<
      (prefix: StorageKey, count: number, startKey?: StorageKey, at?: BlockHash) => Promise<Array<StorageKey>>
    >;

    /**
     * Returns the runtime metadata
     *
     * @rpcname: state_getMetadata
     **/
    getMetadata: GenericRpcCall<(at?: BlockHash) => Promise<Metadata>>;

    /**
     * Returns the keys with prefix, leave empty to get all the keys
     *
     * @rpcname: state_getPairs
     * @deprecated: Please use `getKeysPaged` with proper paging support
     **/
    getPairs: GenericRpcCall<(prefix: StorageKey, at?: BlockHash) => Promise<Array<[StorageKey, StorageData]>>>;

    /**
     * Returns proof of storage entries at a specific block's state.
     *
     * @rpcname: state_getReadProof
     **/
    getReadProof: GenericRpcCall<(keys: Array<StorageKey>, at?: BlockHash) => Promise<ReadProof>>;

    /**
     * Get the runtime version.
     *
     * @rpcname: state_getRuntimeVersion
     **/
    getRuntimeVersion: GenericRpcCall<() => Promise<RuntimeVersion>>;

    /**
     * Returns a storage entry at a specific block's state.
     *
     * @rpcname: state_getStorage
     **/
    getStorage: GenericRpcCall<(key: StorageKey, at?: BlockHash) => Promise<Option<StorageData>>>;

    /**
     * Returns the hash of a storage entry at a block's state.
     *
     * @rpcname: state_getStorageHash
     **/
    getStorageHash: GenericRpcCall<(key: StorageKey, at?: BlockHash) => Promise<Option<Hash>>>;

    /**
     * Returns the hash of a storage entry at a block's state.
     *
     * @rpcname: state_getStorageSize
     **/
    getStorageSize: GenericRpcCall<(key: StorageKey, at?: BlockHash) => Promise<Option<bigint>>>;

    /**
     * Query historical storage entries (by key) starting from a block given as the second parameter. NOTE: The first returned result contains the initial state of storage for all keys. Subsequent values in the vector represent changes to the previous state (diffs). WARNING: The time complexity of this query is O(|keys|*dist(block, hash)), and the memory complexity is O(dist(block, hash)) -- use with caution.
     *
     * @rpcname: state_queryStorage
     **/
    queryStorage: GenericRpcCall<
      (keys: Array<StorageKey>, fromBlock: Hash, at?: BlockHash) => Promise<Array<StorageChangeSet>>
    >;

    /**
     * Query storage entries (by key) at a block hash given as the second parameter. NOTE: Each StorageChangeSet in the result corresponds to exactly one element -- the storage value under an input key at the input block hash.
     *
     * @rpcname: state_queryStorageAt
     **/
    queryStorageAt: GenericRpcCall<(keys: Array<StorageKey>, at?: BlockHash) => Promise<Array<StorageChangeSet>>>;

    /**
     * New runtime version subscription
     *
     * @pubsub: state_runtimeVersion, state_subscribeRuntimeVersion, state_unsubscribeRuntimeVersion
     **/
    subscribeRuntimeVersion: GenericRpcCall<(callback: Callback<RuntimeVersion>) => Promise<Unsub>>;

    /**
     * Subscribes to storage changes for the provided keys
     *
     * @pubsub: state_storage, state_subscribeStorage, state_unsubscribeStorage
     **/
    subscribeStorage: GenericRpcCall<(keys: Array<StorageKey>, callback: Callback<StorageChangeSet>) => Promise<Unsub>>;

    /**
     * The `traceBlock` RPC provides a way to trace the re-execution of a single block, collecting Spans and Events from both the client and the relevant WASM runtime.
     *
     * @rpcname: state_traceBlock
     **/
    traceBlock: GenericRpcCall<
      (
        block: Hash,
        targets: Option<string>,
        storage_keys: Option<string>,
        methods: Option<string>,
      ) => Promise<TraceBlockResponse>
    >;

    [method: string]: GenericRpcCall;
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
    accountNextIndex: GenericRpcCall<(address: string) => Promise<number>>;

    /**
     * Adds the supplied directives to the current log filter
     *
     * The syntax is identical to the CLI `<target>=<level>`:
     *
     * `sync=debug,state=trace`
     *
     * @rpcname: system_addLogFilter
     **/
    addLogFilter: GenericRpcCall<(directives: string) => Promise<void>>;

    /**
     * Adds a reserved peer. Returns the empty string or an error. The string
     * parameter should encode a `p2p` multiaddr.
     *
     * `/ip4/198.51.100.19/tcp/30333/p2p/QmSk5HQbn6LhUwDiNMseVUjuRYhEtYj4aUZ6WfWoGURpdV`
     * is an example of a valid, passing multiaddr with PeerId attached.
     *
     * @rpcname: system_addReservedPeer
     **/
    addReservedPeer: GenericRpcCall<(peer: string) => Promise<void>>;

    /**
     * Get the chain's name. Given as a string identifier.
     *
     * @rpcname: system_chain
     **/
    chain: GenericRpcCall<() => Promise<string>>;

    /**
     * Get the chain's type.
     *
     * @rpcname: system_chainType
     **/
    chainType: GenericRpcCall<() => Promise<ChainType>>;

    /**
     * Dry run an extrinsic at a given block. Return SCALE encoded ApplyExtrinsicResult.
     *
     * @rpcname: system_dryRun
     **/
    dryRun: GenericRpcCall<(extrinsic: Bytes, at?: BlockHash) => Promise<ApplyExtrinsicResult>>;

    /**
     * Return health status of the node.
     *
     * Node is considered healthy if it is:
     * - connected to some peers (unless running in dev mode)
     * - not performing a major sync
     *
     * @rpcname: system_health
     **/
    health: GenericRpcCall<() => Promise<Health>>;

    /**
     * Returns the multi-addresses that the local node is listening on
     *
     * The addresses include a trailing `/p2p/` with the local PeerId, and are thus suitable to
     * be passed to `addReservedPeer` or as a bootnode address for example.
     *
     * @rpcname: system_localListenAddresses
     **/
    localListenAddresses: GenericRpcCall<() => Promise<Array<string>>>;

    /**
     * Returns the base58-encoded PeerId of the node.
     *
     * @rpcname: system_localPeerId
     **/
    localPeerId: GenericRpcCall<() => Promise<string>>;

    /**
     * Get the node's implementation name. Plain old string.
     *
     * @rpcname: system_name
     **/
    name: GenericRpcCall<() => Promise<string>>;

    /**
     * Returns the roles the node is running as
     *
     * @rpcname: system_nodeRoles
     **/
    nodeRoles: GenericRpcCall<() => Promise<Array<NodeRole>>>;

    /**
     * Returns the currently connected peers
     *
     * @rpcname: system_peers
     **/
    peers: GenericRpcCall<() => Promise<Array<PeerInfo>>>;

    /**
     * Get a custom set of properties as a JSON object, defined in the chain spec.
     *
     * @rpcname: system_properties
     **/
    properties: GenericRpcCall<() => Promise<ChainProperties>>;

    /**
     * Remove a reserved peer. Returns the empty string or an error. The string
     * should encode only the PeerId e.g. `QmSk5HQbn6LhUwDiNMseVUjuRYhEtYj4aUZ6WfWoGURpdV`.
     *
     * @rpcname: system_removeReservedPeer
     **/
    removeReservedPeer: GenericRpcCall<(peerId: string) => Promise<void>>;

    /**
     * Returns the list of reserved peers
     *
     * @rpcname: system_reservedPeers
     **/
    reservedPeers: GenericRpcCall<() => Promise<Array<string>>>;

    /**
     * Resets the log filter to Substrate defaults
     *
     * @rpcname: system_resetLogFilter
     **/
    resetLogFilter: GenericRpcCall<() => Promise<void>>;

    /**
     * Returns the state of the syncing of the node: starting block, current best block, highest known block.
     *
     * @rpcname: system_syncState
     **/
    syncState: GenericRpcCall<() => Promise<SyncState>>;

    /**
     * Returns current state of the network.
     *
     * **Warning**: This API is not stable. Please do not programmatically interpret its output,
     * as its format might change at any time.
     *
     * @rpcname: system_unstable_networkState
     **/
    unstable_networkState: GenericRpcCall<() => Promise<NetworkState>>;

    /**
     * Get the node implementation's version. Should be a semver string.
     *
     * @rpcname: system_version
     **/
    version: GenericRpcCall<() => Promise<string>>;

    [method: string]: GenericRpcCall;
  };
  transaction: {
    /**
     * @rpcname: transaction_unstable_submitAndWatch
     **/
    unstable_submitAndWatch: GenericRpcCall;

    /**
     * @rpcname: transaction_unstable_unwatch
     **/
    unstable_unwatch: GenericRpcCall;

    [method: string]: GenericRpcCall;
  };
  web3: {
    /**
     * @rpcname: web3_clientVersion
     **/
    clientVersion: GenericRpcCall;

    /**
     * @rpcname: web3_sha3
     **/
    sha3: GenericRpcCall;

    [method: string]: GenericRpcCall;
  };
}
