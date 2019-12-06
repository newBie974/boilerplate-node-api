function customerHandler(service) {
  async function sendFormatMessage(req, reply) {
    const { name } = req.params;
    const message = await service.formatMessage(name);
    reply
      .code(200)
      .send(message);
  }

  async function getAll(req, reply) {
    const userData = await service.getAll();
    if (!userData) {
      reply
        .code(404)
        .send('[CUSTOMER] nothing in databases');
    }
    reply
      .code(200)
      .send(userData);
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

  async function update(req, reply) {
    const { body } = req;
    const { id } = req.params;
    const updatedUser = await service.update(id, body);
    reply
      .code(200)
      .send(updatedUser);
  }

  async function login(req, reply) {
    const { email, password } = req.body;
    const userGetByMail = await service.login(email, password);
    if (!userGetByMail) {
      reply
        .code(404)
        .send('[CUSTOMER] DOESNT EXIST PLEASE SUBSCRIBE');
    }
    reply
      .code(200)
      .send(userGetByMail);
  }

  return {
    getAll,
    sendFormatMessage,
    getById,
    create,
    update,
    login,
  };
}

module.exports = customerHandler;
