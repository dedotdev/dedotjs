// Generated by dedot cli

import { GenericSubstrateApi } from '@dedot/types';
import type { GenericContractEvent, GenericContractEvents } from 'dedot/contracts';

export interface ContractEvents<ChainApi extends GenericSubstrateApi> extends GenericContractEvents<ChainApi> {
  /**
   * Emitted when the flip function is called.
   *
   * @signature_topic: 0x0a39b5ca0b8b3a5172476100ae7b9168b269cc91d5648efe180c75d935d3e886
   **/
  Flipped: GenericContractEvent<
    'Flipped',
    {
      /**
       * The previous state of the flip.
       *
       * @indexed: false
       **/
      old: boolean;
      /**
       * The new state of the flip.
       *
       * @indexed: false
       **/
      new: boolean;
    }
  >;
}
