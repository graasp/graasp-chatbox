import { defineConfig } from 'cypress';

export default defineConfig({
  chromeWebSecurity: false,
  video: false,

  component: {
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
    viewportWidth: 290,
    viewportHeight: 800,
  },
});
