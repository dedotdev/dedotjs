import { HexString } from './types.js';
import { hexToU8a } from './hex.js';

export function numberToHex(input: number): HexString {
  const hex = (input ?? 0).toString(16);
  return `0x${hex.length % 2 === 0 ? hex : `0${hex}`}`;
}

export function numberToU8a(input: number): Uint8Array {
  return hexToU8a(numberToHex(input));
}