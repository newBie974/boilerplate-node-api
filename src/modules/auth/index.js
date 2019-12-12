const authRepository = require('./repository');
const authService = require('./service');
const authHandler = require('./handler');
const authRouter = require('./router');

function launch(routers) {
  routers.upsertCredentials();
  routers.authentification();
  routers.generateToken();
}

function initModuleAuth({
  fastify,
  database,
  authConfig,
  jwt,
  bcrypt,
  jwtConfig,
}) {
  const repository = authRepository(database);
  const services = authService(repository, authConfig, jwt, bcrypt, jwtConfig);
  const handlers = authHandler(services);
  const routers = authRouter(fastify, handlers);
  launch(routers);
}


module.exports = {
  initModuleAuth,
};
