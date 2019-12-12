const fs = require('fs');
const path = require('path');

require('dotenv-flow').config();

const publicKey = fs.readFileSync(path.resolve(__dirname, './public.key').toString(), 'utf8');
const privateKey = fs.readFileSync(path.resolve(__dirname, './private.key').toString(), 'utf8');
const env = (name) => {
  if (process.env[name] === undefined) throw new Error(`Config error, env var ${name} not defined.`);
  return process.env[name];
};


const config = {
  app: {
    name: env('APP_NAME'),
    port: env('PORT'),
  },
  postgres: {
    user: env('POSTGRES_USER'),
    database: env('POSTGRES_DB'),
    password: env('POSTGRES_PASSWORD'),
    host: env('POSTGRES_HOSTNAME'),
    port: env('POSTGRES_PORT'),
    max: env('POSTGRES_POOL_SIZE'),
    idleTimeoutMillis: env('POSTGRES_IDLETIMEOUTMILLIS'),
  },
  authConfig: {
    saltRounds: parseInt(env('SALT_ROUNDS'), 10),
  },
  clients: {
    hostname: env('HOSTNAME'),
    base: env('BASE'),
    port: env('PORT'),
  },
  jwtConfig: {
    publicKey,
    privateKey,
    signOptions: {
      issuer: 'Poumpoum Company',
      audience: 'coucou',
      expiresIn: '48h',
      algorithm: 'RS256',
    },
  },
};

module.exports = config;
