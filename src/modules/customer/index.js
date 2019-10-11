'use strict';

const customerRouter = require('./customer.router');

function getAll(fastify) {
  return customerRouter.getAll(fastify);
};

function helloName(fastify) {
  return customerRouter.helloName(fastify);
}

module.exports = {
  getAll,
  helloName,
};
