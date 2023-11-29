// Generated by @delightfuldot/codegen

import { GenericSubstrateApi } from '@delightfuldot/types';
import { ChainConsts } from './consts';
import { ChainStorage } from './query';
import { RpcCalls } from './rpc';
import { ChainErrors } from './errors';

export * from './types';
export * from './consts';

export interface MoonbeamApi extends GenericSubstrateApi {
  rpc: RpcCalls;
  consts: ChainConsts;
  query: ChainStorage;
  errors: ChainErrors;
}
