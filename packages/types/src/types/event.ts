import { Phase, H256, Hash } from '@delightfuldot/codecs';

export interface IRuntimeEvent {
  pallet: string;
  palletEvent:
    | string
    | {
        name: string;
        data?: object;
      };
}

export interface IEventRecord<E extends IRuntimeEvent = IRuntimeEvent, H extends Hash = H256> {
  phase: Phase;
  event: E;
  topics: Array<H>;
}