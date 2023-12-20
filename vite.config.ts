import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { PluginOption, UserConfigExport, defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default ({ mode }: { mode: string }): UserConfigExport => {
  return defineConfig({
    plugins: [
      react(),
      dts(),
      ...(mode === 'dev'
        ? [
            visualizer({
              template: 'treemap', // or sunburst
              open: true,
              gzipSize: true,
              brotliSize: true,
              filename: 'analice.html',
            }) as PluginOption,
          ]
        : []),
    ],
    build: {
      lib: {
        // Could also be a dictionary or array of multiple entry points
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'graasp-chatbox',
        formats: ['cjs', 'es'],
        // the proper extensions will be added
        fileName: 'index',
      },
      rollupOptions: {
        // make sure to externalize deps that shouldn't be bundled
        // into your library
        external: [
          'react',
          'react-dom',
          '@mui/material',
          '@mui/lab',
          '@mui/icons-material',
          '@tanstack/react-query',
          '@tanstack/react-query-devtools',
          'stylis-plugin-rtl',
          '@graasp/ui',
          '@graasp/sdk',
          '@graasp/translations',
        ],
        output: {
          // Provide global variables to use in the UMD build
          // for externalized deps
          globals: {
            react: 'React',
          },
        },
      },
    },
  });
};
