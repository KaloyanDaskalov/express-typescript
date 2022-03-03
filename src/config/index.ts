import  'dotenv/config'
// import path from 'path'

// Parsing the env file.
// dotenv.config({ path: path.resolve(process.cwd(), "../config.env") });

// Interface to load env variables
// Note these variables can possibly be undefined
// as someone could skip these varibales or not setup a .env file at all

// interface ENV {
//   NODE_ENV: string | undefined;
//   PORT: number | undefined;
//   MONGO_URI: string | undefined;
// }

// interface Config {
//   NODE_ENV: string;
//   PORT: number;
//   MONGO_URI: string;
// }
interface ENV {
  PORT: string | undefined;
}

interface Config {
  PORT: string;
}

// Loading process.env as ENV interface

// const getConfig = (): ENV => {
//   return {
//     NODE_ENV: process.env.NODE_ENV,
//     PORT: process.env.PORT ? Number(process.env.PORT) : undefined,
//     MONGO_URI: process.env.MONGO_URI
//   };
// };

const devConfig: ENV = {
  PORT: '3000'
}

const getConfig = (): ENV => {
  const environment: string | undefined = process.env.NODE_ENV
  
  if (environment !== 'production') return devConfig;
  
  return {
    PORT: process.env.PORT
  };
};

// Throwing an Error if any field was undefined we don't 
// want our app to run if it can't connect to DB and ensure 
// that these fields are accessible. If all is good return
// it as Config which just removes the undefined from our type 
// definition.

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


