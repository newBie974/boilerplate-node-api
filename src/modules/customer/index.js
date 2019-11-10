const customerRepository = require('./customer.repository');
const customerService = require('./customer.service');
const customerHandler = require('./customer.handler');
const customerRouter = require('./customer.router');

function launch(routers) {
  routers.getAll();
  routers.getMessage();
  routers.getById();
  routers.create();
}

function initModuleCustomer({ fastify, database }) {
  const repository = customerRepository(database);
  const services = customerService(repository);
  const handlers = customerHandler(services);
  const routers = customerRouter(fastify, handlers);
  launch(routers);
}


module.exports = {
  initModuleCustomer,
};
