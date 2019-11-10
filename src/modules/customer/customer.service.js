function customerService() {
  function formatMessage(name) {
    const message = `Hello ${name}`;
    return { message };
  }
  return {
    formatMessage,
  };
}

module.exports = customerService;
