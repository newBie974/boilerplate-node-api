const customerService = require('./customer.service');

async function sendFormatMessage(req, reply) {
  const { formatMessage } = customerService;
  const { name } = req.params;
  const message = await formatMessage(name);
  reply
    .code(200)
    .send(message);
}

function helloWorld(req, reply) {
  const response = { message: 'hello world' };
  reply
    .code(200)
    .send(response);
}

module.exports = {
  sendFormatMessage,
  helloWorld,
};
