function customerService(repository) {
  function formatMessage(name) {
    const message = `Hello ${name}`;
    return { message };
  }
  async function getById(id) {
    const users = await repository.getCustomerById(id);
    return users;
  }
  return {
    formatMessage,
    getById,
  };
}

module.exports = customerService;
