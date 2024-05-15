const fs = require('fs');
const path = require('path');

const targetDir = '.';

const main = () => {
  if (!fs.existsSync(targetDir)) {
    return;
  }

  const currentDir = process.cwd();

  const file = 'package.json';

  let filePath = path.resolve(currentDir, file);

  if (!fs.existsSync(filePath)) {
    return;
  }

  let fileContent = fs.readFileSync(filePath, { encoding: 'utf8' });

  if (file === 'package.json') {
    const pkgJson = JSON.parse(fileContent);
    pkgJson.type = 'commonjs';
    pkgJson.main = './dist/cjs/index.js';
    pkgJson.module = './dist/index.js';
    pkgJson.types = './dist/index.d.ts';

    pkgJson.exports = {
      '.': {
        types: './dist/index.d.ts',
        import: './dist/index.js',
        require: './dist/cjs/index.js',
        default: './dist/index.js',
      },
    };

    if (pkgJson.name === 'dedot') {
      pkgJson.exports['./chaintypes'] = {
        types: './dist/chaintypes/index.d.ts',
        import: './dist/chaintypes/index.js',
        require: './dist/cjs/chaintypes/index.js',
        default: './dist/chaintypes/index.js',
      };
      pkgJson.exports['./codecs'] = {
        types: './dist/codecs/index.d.ts',
        import: './dist/codecs/index.js',
        require: './dist/cjs/codecs/index.js',
        default: './dist/codecs/index.js',
      };
      pkgJson.exports['./types'] = {
        types: './dist/types/index.d.ts',
        import: './dist/types/index.js',
        require: './dist/cjs/types/index.js',
        default: './dist/types/index.js',
      };
      pkgJson.exports['./types/json-rpc'] = {
        types: './dist/types/json-rpc/index.d.ts',
        import: './dist/types/json-rpc/index.js',
        require: './dist/cjs/types/json-rpc/index.js',
        default: './dist/types/json-rpc/index.js',
      };
      pkgJson.exports['./runtime-specs'] = {
        types: './dist/runtime-specs/index.d.ts',
        import: './dist/runtime-specs/index.js',
        require: './dist/cjs/runtime-specs/index.js',
        default: './dist/runtime-specs/index.js',
      };
    }

    fileContent = JSON.stringify(pkgJson, null, 2);
  }

  fs.writeFileSync(path.join(currentDir, targetDir, file), fileContent);
};

main();
