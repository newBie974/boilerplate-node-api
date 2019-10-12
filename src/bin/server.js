const fastify = require('fastify')({ logger: true });

const customer = require('../modules/customer');

 async function start(){
  try {
    const {
      customerRouter,
      customerHandler,
    } = customer;

    customerRouter.getAll(fastify, customerHandler);
    customerRouter.formatMessage(fastify, customerHandler);
    await fastify.listen(3000);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit();
  }
};

start();
