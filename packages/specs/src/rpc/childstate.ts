export const childstate = {
  getKeys: {
    docs: 'Returns the keys with prefix from a child storage, leave empty to get all the keys',
    params: [
      {
        name: 'childKey',
        type: 'PrefixedStorageKey',
      },
      {
        name: 'prefix',
        type: 'StorageKey',
      },
      {
        isHistoric: true,
        isOptional: true,
        name: 'at',
        type: 'Hash',
      },
    ],
    type: 'Array<StorageKey>',
    isSubscription: false,
    jsonrpc: 'childstate_getKeys',
    method: 'getKeys',
    section: 'childstate',
  },
  getKeysPaged: {
    alias: ['childstate_getKeysPagedAt'],
    docs: 'Returns the keys with prefix from a child storage with pagination support',
    params: [
      {
        name: 'childKey',
        type: 'PrefixedStorageKey',
      },
      {
        name: 'prefix',
        type: 'StorageKey',
      },
      {
        name: 'count',
        type: 'u32',
      },
      {
        isOptional: true,
        name: 'startKey',
        type: 'StorageKey',
      },
      {
        isHistoric: true,
        isOptional: true,
        name: 'at',
        type: 'Hash',
      },
    ],
    type: 'Array<StorageKey>',
    isSubscription: false,
    jsonrpc: 'childstate_getKeysPaged',
    method: 'getKeysPaged',
    section: 'childstate',
  },
  getStorage: {
    docs: 'Returns a child storage entry at a specific block state',
    params: [
      {
        name: 'childKey',
        type: 'PrefixedStorageKey',
      },
      {
        name: 'key',
        type: 'StorageKey',
      },
      {
        isHistoric: true,
        isOptional: true,
        name: 'at',
        type: 'Hash',
      },
    ],
    type: 'Option<StorageData>',
    isSubscription: false,
    jsonrpc: 'childstate_getStorage',
    method: 'getStorage',
    section: 'childstate',
  },
  getStorageEntries: {
    docs: 'Returns child storage entries for multiple keys at a specific block state',
    params: [
      {
        name: 'childKey',
        type: 'PrefixedStorageKey',
      },
      {
        name: 'keys',
        type: 'Array<StorageKey>',
      },
      {
        isHistoric: true,
        isOptional: true,
        name: 'at',
        type: 'Hash',
      },
    ],
    type: 'Array<Option<StorageData>>',
    isSubscription: false,
    jsonrpc: 'childstate_getStorageEntries',
    method: 'getStorageEntries',
    section: 'childstate',
  },
  getStorageHash: {
    docs: 'Returns the hash of a child storage entry at a block state',
    params: [
      {
        name: 'childKey',
        type: 'PrefixedStorageKey',
      },
      {
        name: 'key',
        type: 'StorageKey',
      },
      {
        isHistoric: true,
        isOptional: true,
        name: 'at',
        type: 'Hash',
      },
    ],
    type: 'Option<Hash>',
    isSubscription: false,
    jsonrpc: 'childstate_getStorageHash',
    method: 'getStorageHash',
    section: 'childstate',
  },
  getStorageSize: {
    docs: 'Returns the size of a child storage entry at a block state',
    params: [
      {
        name: 'childKey',
        type: 'PrefixedStorageKey',
      },
      {
        name: 'key',
        type: 'StorageKey',
      },
      {
        isHistoric: true,
        isOptional: true,
        name: 'at',
        type: 'Hash',
      },
    ],
    type: 'Option<u64>',
    isSubscription: false,
    jsonrpc: 'childstate_getStorageSize',
    method: 'getStorageSize',
    section: 'childstate',
  },
};
