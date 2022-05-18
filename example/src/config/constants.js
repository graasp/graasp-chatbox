import env from '../env.json';

const { API_HOST: ENV_API_HOST } = env;

export const APP_NAME = 'Graasp Chatbox';

export const ENV = {
  DEVELOPMENT: 'development',
};

export const API_HOST =
  ENV_API_HOST || process.env.REACT_APP_API_HOST || 'http://localhost:3111';

export const HEADER_SIZE = 64;
export const TOOLS_SIZE = 64;

export const GRAASP_PANEL_WIDTH = 290;

export const DEFAULT_CHAT_ID = '39370f67-2153-4ab9-9679-b1966542d27d';
export const DEFAULT_LANG = 'fr';
