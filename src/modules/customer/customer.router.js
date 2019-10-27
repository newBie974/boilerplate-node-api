'use strict';

const customerHandler = require('./customer.handler');

function getAll(fastify) {
  fastify.get('/', customerHandler.helloWorld);
}

function getMessage(fastify) {
  fastify.get('/:name', customerHandler.formatMessage);
}

module.exports = {
  getAll,
  getMessage,
};
