const customerRepository = require('./repository');
const customerService = require('./service');
const customerHandler = require('./handler');
const customerRouter = require('./router');

function initModuleCustomer({
  fastify,
  database,
  authClient,
  nanoid,
}) {
  const repository = customerRepository(database);
  const services = customerService(repository, authClient, nanoid);
  const handlers = customerHandler(services);
  const routers = customerRouter(fastify, handlers);
  routers.start();
}


module.exports = {
  initModuleCustomer,
};
