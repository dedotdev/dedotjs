import { ContractMessage, ContractMetadataSupported } from '@dedot/types';
import { stringCamelCase } from '@dedot/utils';
import { beautifySourceCode, commentBlock, compileTemplate } from '../../utils';
import { QueryGen } from './QueryGen';
import { TypeGen } from './TypeGen';

export class TxGen extends QueryGen {
  constructor(contractMetadata: ContractMetadataSupported, typeGen: TypeGen) {
    super(contractMetadata, typeGen);
  }

  generate() {
    this.typesGen.clearCache();

    this.typesGen.typeImports.addKnownType(
      'GenericSubstrateApi',
      'GenericContractTx',
      'GenericContractTxCall',
      'ContractOptions',
      'ChainSubmittableExtrinsic',
    );

    const { messages } = this.contractMetadata.spec;
    const txMessages = messages.filter((one) => one.mutates);

    let txCallsOut = '';
    txMessages.forEach((txDef) => {
      const { label, docs, selector, args } = txDef;
      txCallsOut += `${commentBlock(
        docs,
        '\n',
        args.map((arg) => `@param {${this.typesGen.generateType(arg.type.type, 1)}} ${stringCamelCase(arg.label)}`),
        '\n',
        `@selector {${selector}}`,
      )}`;
      txCallsOut += `${stringCamelCase(label.replaceAll('::', '_'))}: ${this.#generateMethodDef(txDef)};\n\n`;
      this.#generateMethodDef(txDef);
    });

    const importTypes = this.typesGen.typeImports.toImports();
    const template = compileTemplate('contracts-tx.hbs');

    return beautifySourceCode(template({ importTypes, txCallsOut }));
  }

  #generateMethodDef(def: ContractMessage) {
    const { args, returnType } = def;

    args.forEach(({ type: { type } }) => this.importType(type));

    const paramsOut = args
      .map(({ type: { type }, label }) => `${stringCamelCase(label)}: ${this.typesGen.generateType(type, 1)}`)
      .join(', ');

    return `GenericContractTxCall<(${paramsOut ? `${paramsOut},` : ''} options: ContractOptions) => ChainSubmittableExtrinsic<ChainApi>>`;
  }
}
