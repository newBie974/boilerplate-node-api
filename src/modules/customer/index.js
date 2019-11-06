
const customerService = require('./customer.service');
const customerHandler = require('./customer.handler');
const customerRouter = require('./customer.router');

function launch(router) {
  router.getAll();
  router.getMessage();
}

function initModuleCustomer({ fastify }) {
  const services = customerService();
  const handlers = customerHandler(services);
  const routers = customerRouter(fastify, handlers);
  launch(routers);
}


module.exports = {
  initModuleCustomer,
};
