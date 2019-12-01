function authHandler(service) {
  async function upsertCredentials(req, reply) {
    const { id, password } = req.body;
    const upsertResult = await service.upsertCredentials(id, password);
    reply
      .code(200)
      .send(upsertResult);
  }
  async function authentification(req, reply) {
    const { customerId, password } = req.body;
    console.log('la dedans', customerId, password);
    process.exit();
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
