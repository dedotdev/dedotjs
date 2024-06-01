import { GenericSubstrateApi } from '@dedot/types';
import { assert, concatU8a, hexToU8a, u8aToHex } from '@dedot/utils';
import { ContractCallOptions, ContractMessage, GenericContractQueryCall } from '../types/index.js';
import { normalizeLabel } from '../utils.js';
import { Executor } from './Executor.js';

export class QueryExecutor<ChainApi extends GenericSubstrateApi> extends Executor<ChainApi> {
  doExecute(message: string) {
    const meta = this.#findMessage(message);
    assert(meta, `Query message not found: ${message}`);

    const callFn: GenericContractQueryCall<ChainApi> = async (...params: any[]) => {
      const { args } = meta;
      assert(params.length === args.length + 1, `Expected ${args.length + 1} arguments, got ${params.length}`);

      const callOptions = params[args.length] as ContractCallOptions;
      const { caller, value = 0n, gasLimit, storageDepositLimit } = callOptions;
      assert(caller, 'Expected a valid caller address in ContractCallOptions');

      const formattedInputs = args.map((arg, index) => this.tryEncode(arg, params[index]));
      const bytes = u8aToHex(concatU8a(hexToU8a(meta.selector), ...formattedInputs));

      const contractResult = await this.api.call.contractsApi.call(
        caller,
        this.address,
        value,
        gasLimit,
        storageDepositLimit,
        bytes,
      );

      return contractResult.result.isOk
        ? {
            isOk: true,
            data: this.tryDecode(meta, contractResult.result.value.data),
            rawResult: contractResult,
          }
        : {
            isOk: false,
            rawResult: contractResult,
          };
    };

    callFn.meta = meta;

    return callFn;
  }

  #findMessage(message: string): ContractMessage | undefined {
    return this.metadata.spec.messages.find((one) => normalizeLabel(one.label) === message);
  }
}
