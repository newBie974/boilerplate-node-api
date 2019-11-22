const fastify = require('fastify')({ logger: true });
const helmet = require('fastify-helmet');
const cors = require('fastify-cors');

const db = require('../database');
const config = require('../config');

const { initModuleCustomer } = require('../modules/customer');

async function server() {
  try {
    initModuleCustomer({ fastify, database: db });

    fastify.register(helmet);
    fastify.register(cors, {
      origin: 'http://localhost:8081',
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
