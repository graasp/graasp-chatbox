import { defineConfig } from 'cypress';

export default defineConfig({
  chromeWebSecurity: false,
  video: false,

  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    viewportWidth: 290,
    viewportHeight: 800,
  },
});
