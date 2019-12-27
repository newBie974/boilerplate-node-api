const customerRepository = require('./repository');
const customerService = require('./service');
const customerHandler = require('./handler');
const customerRouter = require('./router');

function launch(routers) {
  routers.getAll();
  routers.getMessage();
  routers.getById();
  routers.create();
  routers.update();
  routers.login();
}

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
  launch(routers);
}


module.exports = {
  initModuleCustomer,
};
