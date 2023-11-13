export const engine = {
  createBlock: {
    docs: 'Instructs the manual-seal authorship task to create a new block',
    params: [
      {
        name: 'createEmpty',
        type: 'boolean',
      },
      {
        name: 'finalize',
        type: 'boolean',
      },
      {
        isOptional: true,
        name: 'parentHash',
        type: 'BlockHash',
      },
    ],
    type: 'CreatedBlock',
    isSubscription: false,
    jsonrpc: 'engine_createBlock',
    method: 'createBlock',
    section: 'engine',
  },
  finalizeBlock: {
    docs: 'Instructs the manual-seal authorship task to finalize a block',
    params: [
      {
        name: 'hash',
        type: 'BlockHash',
      },
      {
        isOptional: true,
        name: 'justification',
        type: 'Justification',
      },
    ],
    type: 'boolean',
    isSubscription: false,
    jsonrpc: 'engine_finalizeBlock',
    method: 'finalizeBlock',
    section: 'engine',
  },
};
