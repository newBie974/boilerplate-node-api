function customerRouter(fastify, customerHandler) {
  function getAll() {
    fastify.get('/', customerHandler.helloWorld);
  }
  function getMessage() {
    fastify.get('/:name', customerHandler.sendFormatMessage);
  }

  return {
    getAll,
    getMessage,
  };
}

module.exports = customerRouter;
