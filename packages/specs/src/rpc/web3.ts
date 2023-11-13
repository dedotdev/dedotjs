export const web3 = {
  clientVersion: {
    aliasSection: 'web3',
    docs: 'Returns current client version.',
    params: [],
    type: 'string',
    isSubscription: false,
    jsonrpc: 'web3_clientVersion',
    method: 'clientVersion',
    section: 'web3',
  },
  sha3: {
    aliasSection: 'web3',
    docs: 'Returns sha3 of the given data',
    params: [
      {
        name: 'data',
        type: 'Bytes',
      },
    ],
    type: 'H256',
    isSubscription: false,
    jsonrpc: 'web3_sha3',
    method: 'sha3',
    section: 'web3',
  },
};
