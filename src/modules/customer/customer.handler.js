function CustomerHandler(service) {
  this.customerService = service;
}

CustomerHandler.prototype.helloWorld = function helloWorld(req, reply) {
  const response = { message: 'hello world' };
  reply
    .code(200)
    .send(response);
};

CustomerHandler.prototype.sendFormatMessage = async function sendFormatMessage(req, reply) {
  const { name } = req.params;
  const message = await this.customerService.formatMessage(name);
  reply
    .code(200)
    .send(message);
};

function factoryCustomerHandler(service) {
  return new CustomerHandler(service);
}
module.exports = factoryCustomerHandler;
