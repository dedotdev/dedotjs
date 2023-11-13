import jsonrpc from '@polkadot/types/interfaces/jsonrpc';
import * as fs from 'fs';
import * as process from 'process';
import * as path from 'path';
import { rpcCallSpecs } from '@delightfuldot/specs';

const run = async () => {
  // const rpcDir = path.resolve(process.cwd(), 'packages/specs/src/rpc')
  fs.writeFileSync('./rpc-specs.json', JSON.stringify(rpcCallSpecs, null, 2));

  // @ts-ignore
  // for (const module in jsonrpc) {
  //   const moduleFile = path.resolve(rpcDir, `${module}.ts`);
  //   fs.writeFileSync(moduleFile, `
  //   export const ${module} = ${JSON.stringify(jsonrpc[module], null, 2)}
  //   `);
  //
  // }
};

run().catch(console.log);
