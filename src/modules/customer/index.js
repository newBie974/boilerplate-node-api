const customerRepository = require('./customer.repository');
const customerService = require('./customer.service');
const customerHandler = require('./customer.handler');
const customerRouter = require('./customer.router');

function launch(routers) {
  routers.getAll();
  routers.getMessage();
  routers.getById();
  routers.create();
  routers.update();
}

function initModuleCustomer({ fastify, database, authClient }) {
  const repository = customerRepository(database);
  const services = customerService(repository, authClient);
  const handlers = customerHandler(services);
  const routers = customerRouter(fastify, handlers);
  launch(routers);
}


module.exports = {
  initModuleCustomer,
};
