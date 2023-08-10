import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { UserConfigExport, defineConfig, loadEnv } from 'vite';

export default ({ mode }: { mode: string }): UserConfigExport => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
  });
};
