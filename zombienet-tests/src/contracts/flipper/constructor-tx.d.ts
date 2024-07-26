// Generated by dedot cli

import type { Hash } from 'dedot/codecs';
import type {
  ConstructorTxOptions,
  GenericConstructorTx,
  GenericConstructorTxCall,
  GenericInstantiateSubmittableExtrinsic,
} from 'dedot/contracts';
import type { GenericSubstrateApi } from 'dedot/types';

export interface ConstructorTx<ChainApi extends GenericSubstrateApi> extends GenericConstructorTx<ChainApi> {
  /**
   * Creates a new flipper smart contract initialized with the given value.
   *
   * @param {boolean} initValue
   * @param {ConstructorTxOptions} options
   *
   * @selector 0x9bae9d5e
   **/
  new: GenericConstructorTxCall<
    ChainApi,
    (initValue: boolean, options: ConstructorTxOptions) => GenericInstantiateSubmittableExtrinsic<ChainApi>
  >;

  /**
   * Creates a new flipper smart contract initialized to `false`.
   *
   * @param {ConstructorTxOptions} options
   *
   * @selector 0x61ef7e3e
   **/
  newDefault: GenericConstructorTxCall<
    ChainApi,
    (options: ConstructorTxOptions) => GenericInstantiateSubmittableExtrinsic<ChainApi>
  >;

  /**
   * Creates a new flipper smart contract with the value being calculate using provided seed.
   *
   * @param {Hash} seed
   * @param {ConstructorTxOptions} options
   *
   * @selector 0x0d1ef0e6
   **/
  basedOnSeed: GenericConstructorTxCall<
    ChainApi,
    (seed: Hash, options: ConstructorTxOptions) => GenericInstantiateSubmittableExtrinsic<ChainApi>
  >;
}
