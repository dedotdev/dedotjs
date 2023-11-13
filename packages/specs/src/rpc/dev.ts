export const dev = {
  getBlockStats: {
    docs: 'Reexecute the specified `block_hash` and gather statistics while doing so',
    isUnsafe: true,
    params: [
      {
        isHistoric: true,
        name: 'at',
        type: 'Hash',
      },
    ],
    type: 'Option<BlockStats>',
    isSubscription: false,
    jsonrpc: 'dev_getBlockStats',
    method: 'getBlockStats',
    section: 'dev',
  },
};
