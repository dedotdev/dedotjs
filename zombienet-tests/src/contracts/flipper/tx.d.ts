// Generated by dedot cli

import type { Hash } from 'dedot/codecs';
import type {
  ContractSubmittableExtrinsic,
  ContractTxOptions,
  GenericContractTx,
  GenericContractTxCall,
} from 'dedot/contracts';
import type { GenericSubstrateApi } from 'dedot/types';

export interface ContractTx<ChainApi extends GenericSubstrateApi> extends GenericContractTx<ChainApi> {
  /**
   * Flips the current value, value based on seed.
   *
   * @param {Hash} seed
   * @param {ContractTxOptions} options
   *
   * @selector 0x847d0968
   **/
  flipWithSeed: GenericContractTxCall<
    ChainApi,
    (seed: Hash, options: ContractTxOptions) => ContractSubmittableExtrinsic<ChainApi>
  >;

  /**
   * Flips the current value of the Flipper's boolean.
   *
   * @param {ContractTxOptions} options
   *
   * @selector 0x633aa551
   **/
  flip: GenericContractTxCall<ChainApi, (options: ContractTxOptions) => ContractSubmittableExtrinsic<ChainApi>>;
}
