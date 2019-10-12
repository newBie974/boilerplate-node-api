'use strict';

const customerHandler = require('./customer.handler');

function getAll(fastify) {
  fastify.get('/', (req, res) => {
    res.send({ hello: 'world' });
  })
}

function formatMessage(fastify) {
  fastify.get('/:name', async (req, res) => {
    return customerHandler.formatMessage(req.params.name);
  })
}

module.exports = {
  getAll,
  formatMessage,
};
