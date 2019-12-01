function authRouter(fastify, authHandler) {
  function upsertCredentials() {
    fastify.post('/auth/', authHandler.upsertCredentials);
  }
  function authentification() {
    fastify.post('/auth/token', authHandler.authentification);
  }
  return {
    upsertCredentials,
    authentification,
  };
}

module.exports = authRouter;
