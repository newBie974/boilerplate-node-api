const customerHandler = require('./customer.handler');

function getAll(fastify) {
  fastify.get('/', customerHandler.helloWorld);
}

function getMessage(fastify) {
  fastify.get('/:name', customerHandler.sendFormatMessage);
}

module.exports = {
  getAll,
  getMessage,
};
