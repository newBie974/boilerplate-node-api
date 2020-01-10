const Service = require('./service');
const Handler = require('./handler');
const Router = require('./router');

function init({
  fastify,
  authClient,
  fs,
  pump,
}) {
  const service = Service({ authClient, pump, fs });
  const handler = Handler(service);
  const router = Router(fastify, handler);
  router.start();
}

module.exports = {
  init,
};
