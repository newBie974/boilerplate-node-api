function authRouter(fastify, authHandler) {
  function upsertCredentials() {
    fastify.post('/', authHandler.upsertCredentials);
  }
  function authentification() {
    fastify.post('/token', authHandler.authentification);
  }
  return {
    upsertCredentials,
    authentification,
  };
}

module.exports = authRouter;
