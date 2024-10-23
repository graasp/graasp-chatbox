import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

export default () => {
  return defineConfig({
    resolve: {
      alias: [
        {
          find: '@',
          replacement: fileURLToPath(new URL('./src', import.meta.url)),
        },
      ],
    },
  });
};
