const authRepository = require('./auth.repository');
const authService = require('./auth.service');
const authHandler = require('./auth.handler');
const authRouter = require('./auth.router');

function launch(routers) {

}

function initModuleAuth({
  fastify,
  database,
  jwt,
  bcrypt,
}) {
  const repository = authRepository(database);
  const services = authService(repository, jwt, bcrypt);
  const handlers = authHandler(services);
  const routers = authRouter(fastify, handlers);
  launch(routers);
}


module.exports = {
  initModuleAuth,
};
