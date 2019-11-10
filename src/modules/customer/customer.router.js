function customerRouter(fastify, customerHandler) {
  function getAll() {
    fastify.get('/', customerHandler.helloWorld);
  }
  function getMessage() {
    // fastify.get('/:name', customerHandler.sendFormatMessage);
  }

  function getById() {
    fastify.get('/:id', customerHandler.getById);
  }

  function create() {
    fastify.post('/', customerHandler.create);
  }

  function update() {
    fastify.put('/:id', customerHandler.update);
  }

  return {
    create,
    getAll,
    getMessage,
    getById,
    update,
  };
}

module.exports = customerRouter;
