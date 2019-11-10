function customerService(repository) {
  function formatMessage(name) {
    const message = `Hello ${name}`;
    return { message };
  }
  async function getById(id) {
    const users = await repository.getCustomerById(id);
    return users;
  }

  async function create(body) {
    const user = await repository.create(body);
    return user;
  }
  return {
    formatMessage,
    getById,
    create,
  };
}

module.exports = customerService;
