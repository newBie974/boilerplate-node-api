function customerService(repository) {
  function formatMessage(name) {
    const message = `Hello ${name}`;
    return { message };
  }
  async function getById(id) {
    const user = await repository.getCustomerById(id);
    return user;
  }

  async function create(body) {
    const user = await repository.create(body);
    return user;
  }

  async function update(id, body) {
    const user = await repository.update(id, body);
    return user;
  }

  async function getAll() {
    const users = await repository.getAll();
    return users;
  }
  return {
    formatMessage,
    getById,
    create,
    update,
    getAll,
  };
}

module.exports = customerService;
