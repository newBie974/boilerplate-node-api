function CustomerRouter(fastify, customerHandler) {
  this.fastify = fastify;
  this.customerHandler = customerHandler;
}

CustomerRouter.prototype.getAll = function getAll() {
  this.fastify.get('/', this.customerHandler.helloWorld);
};

CustomerRouter.prototype.getMessage = function getMessage() {
  console.log(this.customerHandler.customerService.formatMessage());
  this.fastify.get('/:name', this.customerHandler.sendFormatMessage);
};

function factoryCustomerRouter(options, customerHandler) {
  return new CustomerRouter(options, customerHandler);
}
module.exports = factoryCustomerRouter;
