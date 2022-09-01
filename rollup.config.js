import peerDepsExternal from 'rollup-plugin-peer-deps-external';

import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';

export default {
  input: './src/index.ts',
  output: {
    dir: './dist',
    format: 'cjs',
  },
  plugins: [
    json(),
    peerDepsExternal(),
    resolve({
      mainFields: ['module', 'main', 'jsnext:main', 'browser'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    typescript({
      tsconfig: './tsconfig.json',
      sourceMap: false,
      exclude: ['**/*.test.ts', '**/*.test.tsx'],
    }),
    commonjs(),
  ],
  external: [
    '@material-ui/core',
    '@material-ui/icons',
    '@material-ui/lab',
    '@material-ui/styles',
    'react',
    'react-dom',
  ],
};
