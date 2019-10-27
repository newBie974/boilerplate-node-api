'use strict';

const customerService = require('./customer.service');

async function formatMessage(req, res) {
  const { formatMessage } = customerService;
  const { name } = req.params;
  const message = await formatMessage(name);
  res
    .code(200)
    .send(message);
}

function helloWorld(req, res) {
  response = { message: 'hello world' };
  res
    .code(200)
    .send(response);
}

module.exports = {
  formatMessage,
  helloWorld,
}
