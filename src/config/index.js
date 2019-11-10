require('dotenv-flow').config();

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
};

module.exports = config;
