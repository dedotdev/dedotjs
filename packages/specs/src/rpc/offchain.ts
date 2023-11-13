export const offchain = {
  localStorageGet: {
    docs: 'Get offchain local storage under given key and prefix',
    isUnsafe: true,
    params: [
      {
        name: 'kind',
        type: 'StorageKind',
      },
      {
        name: 'key',
        type: 'Bytes',
      },
    ],
    type: 'Option<Bytes>',
    isSubscription: false,
    jsonrpc: 'offchain_localStorageGet',
    method: 'localStorageGet',
    section: 'offchain',
  },
  localStorageSet: {
    docs: 'Set offchain local storage under given key and prefix',
    isUnsafe: true,
    params: [
      {
        name: 'kind',
        type: 'StorageKind',
      },
      {
        name: 'key',
        type: 'Bytes',
      },
      {
        name: 'value',
        type: 'Bytes',
      },
    ],
    type: 'Null',
    isSubscription: false,
    jsonrpc: 'offchain_localStorageSet',
    method: 'localStorageSet',
    section: 'offchain',
  },
};
