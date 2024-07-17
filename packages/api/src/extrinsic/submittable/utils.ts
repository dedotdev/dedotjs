import { IKeyringPair } from '@polkadot/types/types';
import { TransactionStatus } from '@dedot/codecs';
import type { AddressOrPair, TransactionStatusV2 } from '@dedot/types';
import { assert, blake2AsU8a, HexString, hexToU8a, isFunction } from '@dedot/utils';

export function isKeyringPair(account: AddressOrPair): account is IKeyringPair {
  return isFunction((account as IKeyringPair).sign);
}

/**
 * Sign a raw message
 * @param signerPair
 * @param raw
 */
export function signRaw(signerPair: IKeyringPair, raw: HexString): Uint8Array {
  const u8a = hexToU8a(raw);
  // Ref: https://github.com/paritytech/polkadot-sdk/blob/943697fa693a4da6ef481ef93df522accb7d0583/substrate/primitives/runtime/src/generic/unchecked_extrinsic.rs#L234-L238
  const toSignRaw = u8a.length > 256 ? blake2AsU8a(u8a, 256) : u8a;

  return signerPair.sign(toSignRaw, { withType: true });
}

/**
 * Convert transaction status v1 to v2
 *
 * Ref: https://github.com/paritytech/polkadot-sdk/blob/98a364fe6e7abf10819f5fddd3de0588f7c38700/substrate/client/rpc-spec-v2/src/transaction/transaction.rs#L132-L159
 * @param txStatus
 * @param txIndex
 */
export function toTransactionStatusV2(txStatus: TransactionStatus, txIndex?: number): TransactionStatusV2 {
  switch (txStatus.type) {
    case 'Ready':
    case 'Future':
      return { type: 'Validated' };
    case 'Broadcast':
      return { type: 'Broadcasting' };
    case 'Retracted':
      return { type: 'NoLongerInBestChain' };
    case 'InBlock':
      assert(txIndex, 'TxIndex is required');
      return {
        type: 'BestChainBlockIncluded',
        value: {
          blockHash: txStatus.value,
          txIndex,
        },
      };
    case 'Finalized':
      assert(txIndex, 'TxIndex is required');
      return {
        type: 'Finalized',
        value: {
          blockHash: txStatus.value,
          txIndex,
        },
      };
    case 'FinalityTimeout':
      return {
        type: 'Drop',
        value: {
          error: 'Maximum number of finality watchers has been reached',
        },
      };
    case 'Dropped':
      return {
        type: 'Drop',
        value: {
          error: 'Extrinsic dropped from the pool due to exceeding limits',
        },
      };
    case 'Usurped':
      return {
        type: 'Invalid',
        value: {
          error: 'Extrinsic was rendered invalid by another extrinsic',
        },
      };
    case 'Invalid':
      return {
        type: 'Invalid',
        value: {
          error: 'Extrinsic marked as invalid',
        },
      };
  }
}
