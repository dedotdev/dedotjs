import { WsProvider } from '@polkadot/rpc-provider';
import { DelightfulApi } from 'delightfuldot';
import * as fs from 'fs';
import * as path from 'path';
import * as process from 'process';
import { ConstsGen, TypesGen, QueryGen, RpcGen } from './generator';
import { RpcMethods } from "@delightfuldot/types";

const NETWORKS = [
  {
    chain: 'polkadot',
    endpoint: 'wss://rpc.polkadot.io',
  },
  {
    chain: 'kusama',
    endpoint: 'wss://kusama-rpc.polkadot.io',
  },
  {
    chain: 'astar',
    endpoint: 'wss://rpc.astar.network',
  },
  {
    chain: 'moonbeam',
    endpoint: 'wss://1rpc.io/glmr',
  },
];

async function run() {
  for (const network of NETWORKS) {
    const { chain, endpoint } = network;
    console.log(`Generate types for ${chain} via endpoint ${endpoint}`);

    await generateTypes(chain, endpoint);
  }
  console.log('DONE!');
}

async function generateTypes(chain: string, endpoint: string) {
  const defTypesFileName = path.resolve(process.cwd(), `packages/chaintypes/src/${chain}/types.ts`);
  const constsTypesFileName = path.resolve(process.cwd(), `packages/chaintypes/src/${chain}/consts.ts`);
  const queryTypesFileName = path.resolve(process.cwd(), `packages/chaintypes/src/${chain}/query.ts`);
  const rpcCallsFileName = path.resolve(process.cwd(), `packages/chaintypes/src/${chain}/rpc.ts`);

  const api = await DelightfulApi.create({ provider: new WsProvider(endpoint, 2500) });

  const typesGen = new TypesGen(api.metadataLatest);
  const constsGen = new ConstsGen(typesGen);
  const queryGen = new QueryGen(typesGen);

  const { methods }: RpcMethods = await api.rpc.rpc.methods();
  const rpcGen = new RpcGen(typesGen, methods);

  fs.writeFileSync(defTypesFileName, await typesGen.generate());
  fs.writeFileSync(rpcCallsFileName, rpcGen.generate());
  fs.writeFileSync(queryTypesFileName, await queryGen.generate());
  fs.writeFileSync(constsTypesFileName, await constsGen.generate());

  await api.disconnect();
}

run().catch(console.log);
