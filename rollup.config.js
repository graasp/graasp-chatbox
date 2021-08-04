import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from '@rollup/plugin-typescript';

export default {
  input: './src/index.ts',
  output: {
    dir: './dist',
  },
  plugins: [
    peerDepsExternal(),
    resolve({
      mainFields: ['module', 'main', 'jsnext:main', 'browser'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
    typescript({ tsconfig: './tsconfig.json', sourceMap: false }),
    commonjs(),
  ],
  external: [
    'react',
    'react-dom',
    '@material-ui/core',
    '@material-ui/icons',
    '@material-ui/lab',
    '@material-ui/styles',
  ],
};
