import { Hash, TypinkRegistry } from '@dedot/codecs';
import { ConstructorOptions, GenericSubstrateApi } from '@dedot/types';
import { assert, concatU8a, hexToU8a, isWasm, stringCamelCase, u8aToHex } from '@dedot/utils';
import { Dedot } from 'dedot';
import Executor from './Executor';

export class ConstructorExecutor<ChainApi extends GenericSubstrateApi> extends Executor<ChainApi> {
  readonly #code: Hash | Uint8Array | string;

  constructor(api: Dedot<ChainApi>, registry: TypinkRegistry, code: Hash | Uint8Array | string) {
    super(api, registry);
    this.#code = code;
  }

  doExecute(constructor: string): any {
    const constructorMeta = this.#findConstructorMeta(constructor);
    assert(constructorMeta, `Constructor not found: ${constructor}`);

    const callFn = (...params: any) => {
      const { args } = constructorMeta;

      const { value, gasLimit, storageDepositLimit, salt } = params[args.length] as ConstructorOptions;

      const formattedInputs = args.map((arg, index) => this.tryEncode(arg, params[index]));
      const bytes = u8aToHex(concatU8a(hexToU8a(constructorMeta.selector), ...formattedInputs));

      if (isWasm(this.#code)) {
        console.log('run here');
        return this.api.tx.contracts.instantiateWithCode(value, gasLimit, storageDepositLimit, this.#code, bytes, salt);
      } else {
        return this.api.tx.contracts.instantiate(value, gasLimit, storageDepositLimit, this.#code, bytes, salt);
      }
    };

    callFn.meta = constructorMeta;

    return callFn;
  }

  #findConstructorMeta(constructor: string) {
    return this.contractMetadata.spec.constructors.find((one) => stringCamelCase(one.label) === constructor);
  }
}
