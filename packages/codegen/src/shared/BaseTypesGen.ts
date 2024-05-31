import { Field, PortableType, TypeId, TypeParam } from '@dedot/codecs';
import { EnumOptions } from '@dedot/shape';
import { normalizeName, stringPascalCase } from '@dedot/utils';
import { commentBlock, isNativeType, WRAPPER_TYPE_REGEX } from '../utils.js';
import { TypeImports } from './TypeImports.js';
import { findKnownCodec } from './known-codecs.js';

export interface NamedType extends PortableType {
  name: string; // nameIn, ~ typeIn
  nameOut: string; // ~ typeOut
  skip?: boolean;
  knownType?: boolean;
  suffix?: string;
}

export const BASIC_KNOWN_TYPES = ['BitSequence', 'Bytes', 'BytesLike', 'FixedBytes', 'FixedArray', 'Result'];

export abstract class BaseTypesGen {
  types: PortableType[];
  includedTypes: Record<TypeId, NamedType>;
  typeImports: TypeImports;

  protected constructor(types: PortableType[]) {
    this.types = types;
    this.includedTypes = {};
    this.typeImports = new TypeImports();
  }

  abstract includeTypes(): Record<TypeId, NamedType>;

  abstract getEnumOptions(typeId: TypeId): EnumOptions;

  abstract shouldGenerateTypeIn(id: TypeId): boolean;

  typeCache: Record<string, string> = {};

  clearCache() {
    this.typeCache = {};
    this.typeImports.clear();
  }

  generateType(typeId: TypeId, nestedLevel = 0, typeOut = false): string {
    if (nestedLevel > 0) {
      const includedDef = this.includedTypes[typeId];
      // If current typeId has its definition generated,
      // we can just use its name, no need to generate its type again
      if (includedDef) {
        const { name, nameOut } = includedDef;
        if (typeOut) {
          this.addTypeImport(nameOut);
          return nameOut;
        } else {
          this.addTypeImport(name);
          return name;
        }
      }
    }

    const typeCacheKey = `${typeId}/${typeOut ? 'typeOut' : 'typeIn'}`;

    if (this.typeCache[typeCacheKey]) {
      return this.typeCache[typeCacheKey];
    }

    const type = this.#generateType(typeId, nestedLevel, typeOut);
    this.typeCache[typeCacheKey] = type;

    const baseType = this.#removeGenericPart(type);
    if (BASIC_KNOWN_TYPES.includes(baseType)) {
      this.addTypeImport(baseType);
    }

    return type;
  }

  #generateType(typeId: TypeId, nestedLevel = 0, typeOut = false): string {
    const def = this.types[typeId];
    if (!def) {
      throw new Error(`Type def not found ${JSON.stringify(def)}`);
    }

    const { type, path, docs } = def;
    const { tag, value } = type;

    switch (tag) {
      case 'Primitive':
        const $codec = findKnownCodec(value.kind);

        if ($codec.nativeType) {
          return $codec.nativeType;
        } else if (value.kind === 'char') {
          return 'string';
        } else {
          throw new Error(`Invalid primitive type: ${value.kind}`);
        }

      case 'Struct': {
        const { fields } = value;

        if (fields.length === 0) {
          return '{}';
        } else if (!fields[0].name) {
          if (fields.length === 1) {
            return this.generateType(fields[0]!.typeId, nestedLevel + 1, typeOut);
          } else {
            return `[${fields.map((f) => this.generateType(f.typeId, nestedLevel + 1, typeOut)).join(', ')}]`;
          }
        } else {
          return this.generateObjectType(fields, nestedLevel + 1, typeOut);
        }
      }

      case 'Enum': {
        const { members } = value;
        if (path.join('::') === 'Option') {
          const some = members.find((one) => one.name === 'Some');
          if (some) {
            return `${this.generateType(some.fields[0].typeId, nestedLevel + 1, typeOut)} | undefined`;
          }
        } else if (path.join('::') === 'Result') {
          const ok = members.find((one) => one.name === 'Ok');
          const err = members.find((one) => one.name === 'Err');
          if (ok && err) {
            const OkType = this.generateType(ok.fields[0].typeId, nestedLevel + 1, typeOut);
            const ErrType = this.generateType(err.fields[0].typeId, nestedLevel + 1, typeOut);

            return `Result<${OkType}, ${ErrType}>`;
          }
        }

        if (members.length === 0) {
          return 'null';
        } else if (members.every((x) => x.fields.length === 0)) {
          return members.map(({ name, docs }) => `${commentBlock(docs)}'${stringPascalCase(name)}'`).join(' | ');
        } else {
          const membersType: [key: string, value: string | null, docs: string[]][] = [];
          for (const { fields, name, docs } of members) {
            const keyName = stringPascalCase(name);
            if (fields.length === 0) {
              membersType.push([keyName, null, docs]);
            } else if (fields[0]!.name === undefined) {
              const valueType =
                fields.length === 1
                  ? this.generateType(fields[0].typeId, nestedLevel + 1, typeOut)
                  : `[${fields
                      .map(
                        ({ typeId, docs }) =>
                          `${commentBlock(docs)}${this.generateType(typeId, nestedLevel + 1, typeOut)}`,
                      )
                      .join(', ')}]`;
              membersType.push([keyName, valueType, docs]);
            } else {
              membersType.push([keyName, this.generateObjectType(fields, nestedLevel + 1, typeOut), docs]);
            }
          }

          const { tagKey, valueKey } = this.getEnumOptions(typeId);

          return membersType
            .map(([keyName, valueType, docs]) => ({
              tag: `${tagKey}: '${keyName}'`,
              value: valueType ? `, ${valueKey}${this.#isOptionalType(valueType) ? '?' : ''}: ${valueType} ` : '',
              docs,
            }))
            .map(({ tag, value, docs }) => `${commentBlock(docs)}{ ${tag}${value} }`)
            .join(' | ');
        }
      }

      case 'Tuple': {
        const { fields } = value;

        if (fields.length === 0) {
          return '[]';
        } else if (fields.length === 1) {
          return this.generateType(fields[0], nestedLevel + 1, typeOut);
        } else {
          return `[${fields.map((x) => this.generateType(x, nestedLevel + 1, typeOut)).join(', ')}]`;
        }
      }
      case 'BitSequence':
        return 'BitSequence';
      case 'Compact':
        return this.generateType(value.typeParam, nestedLevel + 1, typeOut);
      case 'Sequence':
      case 'SizedVec': {
        const fixedSize = tag === 'SizedVec' ? `${value.len}` : null;
        const $innerType = this.types[value.typeParam].type;
        if ($innerType.tag === 'Primitive' && $innerType.value.kind === 'u8') {
          return fixedSize ? `FixedBytes<${fixedSize}>` : typeOut ? 'Bytes' : 'BytesLike';
        } else {
          const innerType = this.generateType(value.typeParam, nestedLevel + 1, typeOut);
          return fixedSize ? `FixedArray<${innerType}, ${fixedSize}>` : `Array<${innerType}>`;
        }
      }
      default:
        throw new Error(`Invalid type! ${tag}`);
    }
  }

  generateObjectType(fields: Field[], nestedLevel = 0, typeOut = false) {
    const props = fields.map(({ typeId, name, docs }) => {
      const type = this.generateType(typeId, nestedLevel + 1, typeOut);
      return {
        name: normalizeName(name!),
        type,
        optional: this.#isOptionalType(type),
        docs,
      };
    });

    return `{${props
      .map(({ name, type, optional, docs }) => `${commentBlock(docs)}${name}${optional ? '?' : ''}: ${type}`)
      .join(',\n')}}`;
  }

  #isOptionalType(type: string) {
    return type.endsWith('| undefined');
  }

  #removeGenericPart(typeName: string) {
    if (typeName.match(WRAPPER_TYPE_REGEX)) {
      return typeName.replace(WRAPPER_TYPE_REGEX, (_, $1) => $1);
    } else {
      return typeName;
    }
  }

  cleanPath(path: string[]) {
    return path
      .map((one) => stringPascalCase(one))
      .filter((one, idx, currentPath) => idx === 0 || one !== currentPath[idx - 1])
      .join('');
  }

  eqlCache = new Map<string, boolean>();

  typeEql(idA: number, idB: number, level = 0): boolean {
    const cacheKey = `${idA}==${idB}`;
    if (!this.eqlCache.has(cacheKey)) {
      this.eqlCache.set(cacheKey, true);
      this.eqlCache.set(cacheKey, this.#typeEql(idA, idB, level));
    }

    return this.eqlCache.get(cacheKey)!;
  }

  #typeEql(idA: number, idB: number, lvl = 0): boolean {
    if (idA === idB) return true;

    const typeA = this.types[idA];
    const typeB = this.types[idB];

    if (typeA.path.join('::') !== typeB.path.join('::')) return false;

    const { type: defA, params: paramsA } = typeA;
    const { type: defB, params: paramsB } = typeB;

    if (!this.#eqlArray(paramsA, paramsB, (valA, valB) => this.#eqlTypeParam(valA, valB))) {
      return false;
    }

    if (defA.tag !== defB.tag) return false;
    if (defA.tag === 'BitSequence') return true;

    if (defA.tag === 'Primitive' && defB.tag === 'Primitive') {
      return defA.value.kind === defB.value.kind;
    }

    if ((defA.tag === 'Compact' && defB.tag === 'Compact') || (defA.tag === 'Sequence' && defB.tag === 'Sequence')) {
      return this.typeEql(defA.value.typeParam, defB.value.typeParam, lvl + 1);
    }

    if (defA.tag === 'SizedVec' && defB.tag === 'SizedVec') {
      return defA.value.len === defB.value.len && this.typeEql(defA.value.typeParam, defB.value.typeParam, lvl + 1);
    }

    if (defA.tag === 'Tuple' && defB.tag === 'Tuple') {
      return this.#eqlArray(defA.value.fields, defB.value.fields, (val1, val2) => this.typeEql(val1, val2, lvl + 1));
    }

    if (defA.tag === 'Struct' && defB.tag === 'Struct') {
      return this.#eqlFields(defA.value.fields, defB.value.fields, lvl);
    }

    if (defA.tag === 'Enum' && defB.tag === 'Enum') {
      return this.#eqlArray(
        defA.value.members,
        defB.value.members,
        (val1, val2) =>
          val1.name === val2.name && val1.index === val2.index && this.#eqlFields(val1.fields, val2.fields, lvl),
      );
    }

    return false;
  }

  #eqlArray<T1, T2>(arr1: Array<T1>, arr2: Array<T2>, eqlVal: (val1: T1, val2: T2) => boolean) {
    return arr1.length === arr2.length && arr1.every((e1, idx) => eqlVal(e1, arr2[idx]));
  }

  #eqlFields(arr1: Array<Field>, arr2: Array<Field>, lvl: number) {
    return this.#eqlArray(
      arr1,
      arr2,
      (val1, val2) =>
        val1.name === val2.name && val1.typeName === val2.typeName && this.#typeEql(val1.typeId, val2.typeId),
    );
  }

  #eqlTypeParam(param1: TypeParam, param2: TypeParam) {
    return (
      param1.name === param2.name &&
      (param1.typeId === undefined) === (param2.typeId === undefined) &&
      (param1.typeId === undefined || this.#typeEql(param1.typeId!, param2.typeId!))
    );
  }

  extractDupTypeSuffix(dupTypeId: TypeId, originalTypeId: TypeId, dupCount: number) {
    const originalTypeParams = this.types[originalTypeId].params;
    const dupTypeParams = this.types[dupTypeId].params;
    const diffParam = dupTypeParams.find((one, idx) => !this.#eqlTypeParam(one, originalTypeParams[idx]));

    // TODO make sure these suffix is unique if a type is duplicated more than 2 times
    if (diffParam?.typeId) {
      const diffType = this.types[diffParam.typeId];
      if (diffType.path.length > 0) {
        return stringPascalCase(diffType.path.at(-1)!);
      } else if (diffType.type.tag === 'Primitive') {
        return stringPascalCase(diffType.type.value.kind);
      }
    }

    // Last resort!
    return dupCount.toString().padStart(3, '0');
  }

  addTypeImport(typeName: string | string[]) {
    if (Array.isArray(typeName)) {
      typeName.forEach((one) => this.addTypeImport(one));
      return;
    }

    if (isNativeType(typeName)) {
      return;
    }

    for (let type of Object.values(this.includedTypes)) {
      if (type.skip) {
        continue;
      }

      const { name, nameOut, knownType } = type;
      if (name === typeName || nameOut === typeName) {
        if (knownType) {
          this.typeImports.addCodecType(typeName);
        } else {
          this.typeImports.addPortableType(typeName);
        }

        return;
      }
    }

    if (BASIC_KNOWN_TYPES.includes(typeName)) {
      this.typeImports.addCodecType(typeName);
      return;
    }

    this.typeImports.addOutType(typeName);
  }
}