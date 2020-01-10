function Router(fastify, handler) {
  function start() {
    fastify.post('/upload/profile', handler.uploadProfile);
  }
  return {
    start,
  };
}

module.exports = Router;
