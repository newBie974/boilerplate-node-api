function customerHandler(service) {
  function helloWorld(req, reply) {
    const response = { message: 'hello world' };
    reply
      .code(200)
      .send(response);
  }
  async function sendFormatMessage(req, reply) {
    const { name } = req.params;
    const message = await service.formatMessage(name);
    reply
      .code(200)
      .send(message);
  }

  async function getById(req, reply) {
    const { id } = req.params;
    const userData = await service.getById(id);
    if (!userData) {
      reply
        .code(404)
        .send('[CUSTOMER] couldnt find by id');
    }
    reply
      .code(200)
      .send(userData);
  }

  async function create(req, reply) {
    const { body } = req;
    const createdUser = await service.create(body);
    reply
      .code(201)
      .send(createdUser);
  }

  return {
    helloWorld,
    sendFormatMessage,
    getById,
    create,
  };
}

module.exports = customerHandler;
