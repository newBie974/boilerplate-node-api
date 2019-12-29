function customerRouter(fastify, customerHandler) {
  function start() {
    /* **********[GET]********** */
    fastify.get('/customer/', customerHandler.getAll);
    fastify.get('/customer/:id', customerHandler.getById);
    /* **********[GET]********** */
    /* **********[POST]********** */
    fastify.post('/customer/', customerHandler.create);
    fastify.post('/customer/login', customerHandler.login);
    /* **********[POST]********** */
    /* **********[PUT]********** */
    fastify.put('/customer/:id', customerHandler.update);
    /* **********[PUT]********** */
  }
  return {
    start,
  };
}

module.exports = customerRouter;
