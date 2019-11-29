function authHandler(service) {
  async function upsertCredentials(req, reply) {
    const { id, password } = req.body;
    const upsertResult = await service.upsertCredentials(id, password);
    reply
      .code(200)
      .send(upsertResult);
  }
  return {
    upsertCredentials,
  };
}

module.exports = authHandler;
