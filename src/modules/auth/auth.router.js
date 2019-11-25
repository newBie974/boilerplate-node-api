function authRouter(fastify, authHandler) {
  function upsertCredentials() {
    fastify.post('/', authHandler.upsertCredentials);
  }
  return {
    upsertCredentials,
  };
}

module.exports = authRouter;
