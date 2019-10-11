'use strict';

function getAll(fastify) {
  fastify.get('/', (req, res) => {
    res.send({ hello: 'world' });
  })
}

function helloName(fastify) {
  fastify.get('/:name', (req, res) => {
    res.send({ hello: `${req.params.name}` });
  })
}

module.exports = {
  getAll,
  helloName
};
