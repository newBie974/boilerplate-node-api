function authHandler(service) {
  async function upsertCredentials(req, reply) {
    const { customerId, password } = req.body;
    const upsertedCredentials = await service.upsertCredentials(customerId, password);
    reply
      .code(200)
      .send(upsertedCredentials);
  }
  async function authentification(req, reply) {
    const { customerId, password } = req.body;
    const credentials = await service.authentification(customerId, password);
    if (!credentials) {
      reply
        .code(401);
    }
    reply
      .code(200);
  }
  return {
    upsertCredentials,
    authentification,
  };
}

module.exports = authHandler;
