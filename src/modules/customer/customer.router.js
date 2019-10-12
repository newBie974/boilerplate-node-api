'use strict';

function getAll(fastify) {
  fastify.get('/', (req, res) => {
    res.send({ hello: 'world' });
  })
}

function formatMessage(fastify, customerHandler) {
  fastify.get('/:name', async (req, res) => {
    return customerHandler.formatMessage(req.params.name);
  })
}

module.exports = {
  getAll,
  formatMessage,
};
