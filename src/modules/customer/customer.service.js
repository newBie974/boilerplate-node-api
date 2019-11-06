function CustomerService(options) {
  this.options = options;
}

CustomerService.prototype.formatMessage = function formatMessage(name) {
  const message = `Hello ${name}`;
  return { message };
};

function factoryCustomerService(options = {}) {
  return new CustomerService(options);
}

module.exports = factoryCustomerService;
