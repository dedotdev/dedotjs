export const babe = {
  epochAuthorship: {
    docs: 'Returns data about which slots (primary or secondary) can be claimed in the current epoch with the keys in the keystore',
    isUnsafe: true,
    params: [],
    type: 'HashMap<AuthorityId, EpochAuthorship>',
    isSubscription: false,
    jsonrpc: 'babe_epochAuthorship',
    method: 'epochAuthorship',
    section: 'babe',
  },
};
