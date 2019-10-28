const customerService = require('./customer.service');

async function sendFormatMessage(req, res) {
  const { formatMessage } = customerService;
  const { name } = req.params;
  const message = await formatMessage(name);
  res
    .code(200)
    .send(message);
}

function helloWorld(req, res) {
  const response = { message: 'hello world' };
  res
    .code(200)
    .send(response);
}

module.exports = {
  sendFormatMessage,
  helloWorld,
};
