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

  return {
    helloWorld,
    sendFormatMessage,
  };
}

module.exports = customerHandler;
