const fastify = require('fastify')({ logger: true });
const helmet = require('fastify-helmet');
const cors = require('fastify-cors');
const superagent = require('superagent');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nanoid = require('nanoid');
const database = require('../database');
const config = require('../config');

const { initModuleCustomer } = require('../modules/customer');
const { initModuleAuth } = require('../modules/auth');
const Clients = require('../clients');

async function server() {
  try {
    const { authConfig, clients, jwtConfig } = config;
    const { authClient } = Clients({ superagent, clients });

    initModuleCustomer({
      fastify,
      database,
      authClient,
      nanoid,
    });
    initModuleAuth({
      fastify,
      database,
      authConfig,
      jwt,
      bcrypt,
      jwtConfig,
    });
    fastify.register(helmet);
    fastify.register(cors, {
      origin: 'http://localhost:8080',
    });
    await fastify.listen(config.app.port || 3000);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit();
  }
}

module.exports = {
  server,
};
