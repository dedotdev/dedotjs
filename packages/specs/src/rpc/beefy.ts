export const beefy = {
  getFinalizedHead: {
    docs: 'Returns hash of the latest BEEFY finalized block as seen by this client.',
    params: [],
    type: 'H256',
    isSubscription: false,
    jsonrpc: 'beefy_getFinalizedHead',
    method: 'getFinalizedHead',
    section: 'beefy',
  },
  subscribeJustifications: {
    docs: 'Returns the block most recently finalized by BEEFY, alongside side its justification.',
    params: [],
    pubsub: ['justifications', 'subscribeJustifications', 'unsubscribeJustifications'],
    type: 'BeefySignedCommitment',
    isSubscription: true,
    jsonrpc: 'beefy_subscribeJustifications',
    method: 'subscribeJustifications',
    section: 'beefy',
  },
};
