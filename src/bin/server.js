const fastify = require('fastify')({ logger: true });
const helmet = require('fastify-helmet');
const cors = require('fastify-cors');
const multipart = require('fastify-multipart');
const superagent = require('superagent');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nanoid = require('nanoid');
const fs = require('fs');
const pump = require('pump'); // should be removed

const database = require('../database');
const config = require('../config');

const { initModuleCustomer } = require('../modules/customer');
const { initModuleAuth } = require('../modules/auth');
const { init: initModuleUpload } = require('../modules/upload');
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
    initModuleUpload({
      fastify,
      fs,
      pump,
      authClient,
    });
    fastify.register(helmet);
    fastify.register(multipart);
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
