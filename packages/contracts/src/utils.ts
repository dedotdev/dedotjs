import { ISubstrateClient } from '@dedot/api';
import { PortableType, TypeDef } from '@dedot/codecs';
import { GenericSubstrateApi } from '@dedot/types';
import { stringCamelCase } from '@dedot/utils';
import { Executor } from './executor/index.js';
import { ContractMetadata, ContractTypeDef } from './types/index.js';

export const extractContractTypes = (contractMetadata: ContractMetadata): PortableType[] => {
  const { types } = contractMetadata;

  return types.map(
    ({ type, id }) =>
      ({
        id,
        typeDef: normalizeContractTypeDef(type.def),
        params: [],
        path: type?.path || [],
        docs: [],
      }) as PortableType,
  );
};

export const normalizeContractTypeDef = (def: ContractTypeDef): TypeDef => {
  let type: string;
  let value: any;

  if (def.variant) {
    type = 'Enum';
    value = {
      members:
        def.variant.variants?.map((variant) => ({
          fields: variant.fields?.map((fields) => ({ typeId: fields.type, typeName: fields.typeName })) || [],
          index: variant.index,
          name: variant.name,
        })) || [],
    };
  } else if (def.tuple) {
    type = 'Tuple';
    value = {
      fields: def.tuple,
    };
  } else if (def.sequence) {
    type = 'Sequence';
    value = {
      typeParam: def.sequence.type,
    };
  } else if (def.composite) {
    type = 'Struct';
    value = {
      fields: def.composite.fields.map((one) => ({
        typeId: one.type,
        name: one.name,
        typeName: one.typeName,
      })),
    };
  } else if (def.primitive) {
    type = 'Primitive';
    value = {
      kind: def.primitive,
    };
  } else if (def.array) {
    type = 'SizedVec';
    value = {
      len: def.array.len,
      typeParam: def.array.type,
    };
  } else {
    throw Error(`Invalid contract type def: ${JSON.stringify(def)}`);
  }

  return { type, value } as TypeDef;
};

const UNSUPPORTED_VERSIONS = ['V3', 'V2', 'V1'] as const;

const SUPPORTED_VERSIONS = [5, '4'] as const;

export const parseRawMetadata = (rawMetadata: string): ContractMetadata => {
  const metadata = JSON.parse(rawMetadata);

  // This is for V1, V2, V3
  const unsupportedVersion = UNSUPPORTED_VERSIONS.find((o) => metadata[o]);
  if (unsupportedVersion) {
    throw new Error(`Unsupported metadata version: ${unsupportedVersion}`);
  }

  // This is for V4, V5
  if (!SUPPORTED_VERSIONS.includes(metadata.version)) {
    throw new Error(`Unsupported metadata version: ${metadata.version}`);
  }

  return metadata as ContractMetadata;
};

export function newProxyChain<ChainApi extends GenericSubstrateApi>(carrier: Executor<ChainApi>): unknown {
  return new Proxy(carrier, {
    get(target: Executor<ChainApi>, property: string | symbol): any {
      return target.doExecute(property.toString());
    },
  });
}

export function ensureSupportContractsPallet<ChainApi extends GenericSubstrateApi>(api: ISubstrateClient<ChainApi>) {
  try {
    !!api.call.contractsApi.call.meta && !!api.tx.contracts.call.meta;
  } catch {
    throw new Error('Contracts pallet is not available');
  }
}

export function normalizeLabel(label?: string): string {
  if (!label) return '';
  return stringCamelCase(label.replaceAll('::', '_'));
}
