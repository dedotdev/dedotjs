export const mmr = {
  generateProof: {
    docs: 'Generate MMR proof for the given block numbers.',
    params: [
      {
        name: 'blockNumbers',
        type: 'Array<u64>',
      },
      {
        isOptional: true,
        name: 'bestKnownBlockNumber',
        type: 'u64',
      },
      {
        isHistoric: true,
        isOptional: true,
        name: 'at',
        type: 'BlockHash',
      },
    ],
    type: 'MmrLeafBatchProof',
    isSubscription: false,
    jsonrpc: 'mmr_generateProof',
    method: 'generateProof',
    section: 'mmr',
  },
  root: {
    docs: 'Get the MMR root hash for the current best block.',
    params: [
      {
        isHistoric: true,
        isOptional: true,
        name: 'at',
        type: 'BlockHash',
      },
    ],
    type: 'MmrHash',
    isSubscription: false,
    jsonrpc: 'mmr_root',
    method: 'root',
    section: 'mmr',
  },
  verifyProof: {
    docs: 'Verify an MMR proof',
    params: [
      {
        name: 'proof',
        type: 'MmrLeafBatchProof',
      },
    ],
    type: 'boolean',
    isSubscription: false,
    jsonrpc: 'mmr_verifyProof',
    method: 'verifyProof',
    section: 'mmr',
  },
  verifyProofStateless: {
    docs: 'Verify an MMR proof statelessly given an mmr_root',
    params: [
      {
        name: 'root',
        type: 'MmrHash',
      },
      {
        name: 'proof',
        type: 'MmrLeafBatchProof',
      },
    ],
    type: 'boolean',
    isSubscription: false,
    jsonrpc: 'mmr_verifyProofStateless',
    method: 'verifyProofStateless',
    section: 'mmr',
  },
};
