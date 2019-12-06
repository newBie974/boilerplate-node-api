function customerRouter(fastify, customerHandler) {
  function getAll() {
    fastify.get('/customer/', customerHandler.getAll);
  }
  function getMessage() {
    // fastify.get('/:name', customerHandler.sendFormatMessage);
  }

  function getById() {
    fastify.get('/customer/:id', customerHandler.getById);
  }

  function create() {
    fastify.post('/customer/', customerHandler.create);
  }

  function update() {
    fastify.put('/customer/:id', customerHandler.update);
  }

  function login() {
    fastify.post('/customer/login', customerHandler.login);
  }

  return {
    create,
    getAll,
    getMessage,
    getById,
    update,
    login,
  };
}

module.exports = customerRouter;
