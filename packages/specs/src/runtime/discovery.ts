import { RuntimeApisModule } from '@delightfuldot/types';

/**
 * Ref: https://github.com/paritytech/polkadot-sdk/blob/bc53b9a03a742f8b658806a01a7bf853cb9a86cd/substrate/primitives/authority-discovery/src/lib.rs#L40-L49
 */
export const discovery: RuntimeApisModule = {
  AuthorityDiscoveryApi: [
    {
      methods: {
        authorities: {
          docs: 'Retrieve authority identifiers of the current and next authority set.',
          params: [],
          type: 'Array<AccountId32>',
        },
      },
      version: 1,
    },
  ],
};
