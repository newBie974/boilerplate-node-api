function authRouter(fastify, authHandler) {
  function upsertCredentials() {
    fastify.post('/auth/', authHandler.upsertCredentials);
  }
  function authentification() {
    fastify.post('/auth/token', authHandler.authentification);
  }
  function generateToken() {
    fastify.post('/auth/generate_token', authHandler.generateToken);
  }
  return {
    upsertCredentials,
    authentification,
    generateToken,
  };
}

module.exports = authRouter;
