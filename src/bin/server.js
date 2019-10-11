const fastify = require('fastify')({ logger: true });

fastify.get('/', async(req, res) => {
  return { hello: 'world' };
});

 async function start(){
  try {
    await fastify.listen(3000);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit();
  }
}

start();
