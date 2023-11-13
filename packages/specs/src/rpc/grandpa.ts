export const grandpa = {
  proveFinality: {
    docs: 'Prove finality for the given block number, returning the Justification for the last block in the set.',
    params: [
      {
        name: 'blockNumber',
        type: 'BlockNumber',
      },
    ],
    type: 'Option<EncodedFinalityProofs>',
    isSubscription: false,
    jsonrpc: 'grandpa_proveFinality',
    method: 'proveFinality',
    section: 'grandpa',
  },
  roundState: {
    docs: 'Returns the state of the current best round state as well as the ongoing background rounds',
    params: [],
    type: 'ReportedRoundStates',
    isSubscription: false,
    jsonrpc: 'grandpa_roundState',
    method: 'roundState',
    section: 'grandpa',
  },
  subscribeJustifications: {
    docs: 'Subscribes to grandpa justifications',
    params: [],
    pubsub: ['justifications', 'subscribeJustifications', 'unsubscribeJustifications'],
    type: 'JustificationNotification',
    isSubscription: true,
    jsonrpc: 'grandpa_subscribeJustifications',
    method: 'subscribeJustifications',
    section: 'grandpa',
  },
};
