function Handler(service) {
  function uploadProfile(req, reply) {
    try {
      req.multipart(service.writeFile, service.onEnd);
      reply.code(201)
        .send({});
    } catch (err) {
      console.log('errrrrr', err);
      reply.code(418);
    }
  }

  return {
    uploadProfile,
  };
}

module.exports = Handler;
