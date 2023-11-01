import { findAliasRpcSpec, findRpcSpec, RpcModuleName } from '@delightfuldot/specs';
import { RpcCallSpec } from '@delightfuldot/specs/types';
import { isJsPrimitive } from '@delightfuldot/utils';
import { ApiGen, TypesGen } from '../generator';
import { beautifySourceCode, commentBlock, compileTemplate } from './utils';

const HIDDEN_RPCS = [
  // Ref: https://github.com/paritytech/polkadot-sdk/blob/43415ef58c143b985e09015cd000dbd65f6d3997/substrate/client/rpc-servers/src/lib.rs#L152C9-L158
  'rpc_methods',
];

export class RpcGen extends ApiGen {
  constructor(
    readonly typesGen: TypesGen,
    readonly rpcMethods: string[],
  ) {
    super(typesGen);
    HIDDEN_RPCS.filter((one) => !rpcMethods.includes(one)).forEach((one) => rpcMethods.push(one));
    rpcMethods.sort();
  }

  generate() {
    this.typesGen.clearCache();
    this.typesGen.typeImports.addKnownType('GenericRpcCalls', 'AsyncMethod');

    const specsByModule = this.rpcMethods
      .filter((one) => !findAliasRpcSpec(one)) // we'll ignore alias rpc for now if defined in the specs! TODO should we generate alias rpc as well?
      .map((one) => {
        const spec = findRpcSpec(one);
        if (spec) {
          return spec;
        }

        const [module, ...methodParts] = one.split('_');
        const method = methodParts.join('_');

        return {
          params: [],
          type: 'AsyncMethod',
          module,
          method,
        } as RpcCallSpec;
      })
      .reduce(
        (o, spec) => {
          const { module, method } = spec;

          // ignore if rpc name does not confront with the general convention
          if (!module || !method) {
            return o;
          }

          return {
            ...o,
            [module]: o[module] ? [...o[module], spec] : [spec],
          };
        },
        {} as Record<RpcModuleName, RpcCallSpec[]>,
      );
    let rpcCallsOut = '';
    Object.keys(specsByModule).forEach((module) => {
      const specs = specsByModule[module];
      // TODO add alias info to docs block!
      rpcCallsOut += `${module}: {
      ${specs.map((spec) => this.#generateMethodDef(spec)).join(',\n')},

      [method: string]: AsyncMethod,
    },`;
    });

    // TODO include & define external types

    const importTypes = this.typesGen.typeImports.toImports();
    const template = compileTemplate('rpc.hbs');

    return beautifySourceCode(template({ importTypes, rpcCallsOut }));
  }

  #generateMethodDef(spec: RpcCallSpec) {
    const { name, type, module, method, docs = [], params } = spec;

    const rpcName = name || `${module}_${method}`;
    const defaultDocs = `@rpcname: ${rpcName}`;

    if (type === 'AsyncMethod' && params.length === 0) {
      return `${commentBlock(defaultDocs)}${method}: AsyncMethod`;
    }

    this.addTypeImport(type);
    this.addTypeImport(params.map((one) => one.type));

    return `${commentBlock(docs, '\n', defaultDocs)}${method}(${params.map(
      ({ name, type, isOptional }) => `${name}${isOptional ? '?' : ''}: ${type}`,
    )}): Promise<${type}>`;
  }

  addTypeImport(type: string | string[]) {
    if (Array.isArray(type)) {
      type.forEach((one) => this.addTypeImport(one));
      return;
    }

    if (isJsPrimitive(type)) {
      return;
    }

    // TODO handle for generic wrapper types
    const matchArray = type.match(/^Array<(.+)>$/);
    if (matchArray) {
      this.addTypeImport(matchArray[1]);
      return;
    }

    try {
      this.registry.findCodec(type);
      this.typesGen.typeImports.addCodecType(type);
      return;
    } catch (e) {}

    this.typesGen.addTypeImport(type);
  }
}
