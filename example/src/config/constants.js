import env from '../env.json';

const { API_HOST: ENV_API_HOST } = env;

export const APP_NAME = 'Graasp Chatbox';

export const ENV = {
  DEVELOPMENT: 'development',
};

export const API_HOST =
  ENV_API_HOST || process.env.REACT_APP_API_HOST || 'http://localhost:3111';
