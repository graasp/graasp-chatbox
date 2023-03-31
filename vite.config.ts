import { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'chatbox',
      fileName: 'chatbox',
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react-query',
        '@mui/icons-material',
        '@mui/material',
        '@mui/lab',
        '@emotion/react',
        '@emotion/styled',
        'immutable',
        '@graasp/ui',
        '@graasp/translations',
        '@graasp/sdk',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
