const fastify = require('fastify')({ logger: true });
const helmet = require('fastify-helmet');

const { initModuleCustomer } = require('../modules/customer');

async function server() {
  try {
    initModuleCustomer({ fastify });
    fastify.register(helmet);
    await fastify.listen(3000);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit();
  }
}

module.exports = {
  server,
};
