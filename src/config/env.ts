import  'dotenv/config'
import { ENV, Config } from '../ts/interfaces/env.js'

const getConfig = (): ENV => {
  const environment: string | undefined = process.env.NODE_ENV
  
  if (environment !== 'production') {
    return {
      PORT: Number(process.env.PORT) || undefined,
      HOST: process.env.HOST_DEV,
      USER: process.env.USER_DEV,
      PASSWORD: process.env.PASSWORD_DEV,
      DATABASE: process.env.DATABASE_DEV
    }
  }
// TODO production variables
  return {
    PORT: Number(process.env.PORT) || undefined,
    HOST: process.env.HOST_DEV,
    USER: process.env.USER_DEV,
    PASSWORD: process.env.PASSWORD_DEV,
    DATABASE: process.env.DATABASE_DEV
  }
  
};

const getSanitzedConfig = (config: ENV): Config => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) {
      throw new Error(`Missing key ${key} in .env`);
    }
  }
  return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;


