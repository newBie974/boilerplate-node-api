function customerRouter(fastify, customerHandler) {
  function getAll() {
    fastify.get('/', customerHandler.helloWorld);
  }
  function getMessage() {
    fastify.get('/:name', customerHandler.sendFormatMessage);
  }
  function getById() {
    fastify.get('/:id', customerHandler.getById);
  }
  return {
    getAll,
    getMessage,
    getById,
  };
}

module.exports = customerRouter;
