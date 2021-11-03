const esbuild = require('esbuild');

// Automatically exclude all node_modules from the bundled version
// const { nodeExternalsPlugin } = require('esbuild-node-externals');
// esbuild src/ydb-main.ts --bundle --platform=node --minify --sourcemap=external --outfile=dist/esbuild/ydb.js",

esbuild
  .build({
    entryPoints: ['./src/ydb-main.ts'],
    outfile: 'dist/index.js',
    bundle: true,
    minify: true,
    platform: 'node',
    sourcemap: true,
    target: 'node14',
    // plugins: [nodeExternalsPlugin()],
  })
  .catch(() => process.exit(1));
