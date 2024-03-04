import { keccak_256 as keccak256, keccak_512 as keccak512 } from '@noble/hashes/sha3';
import { u8aToHex, u8aToU8a } from '@polkadot/util';
import { HexString } from '../types';

export function keccakAsU8a(data: string | Uint8Array, bitLength: 256 | 512 = 256): Uint8Array {
  const u8a = u8aToU8a(data);

  if (bitLength === 256) {
    return keccak256(u8a);
  } else if (bitLength === 512) {
    return keccak512(u8a);
  }

  throw new Error('Invalid bitLength, only support 256 or 512!');
}

export function keccakAsHex(data: string | Uint8Array, bitLength?: 256 | 512): HexString {
  return u8aToHex(keccakAsU8a(data, bitLength));
}