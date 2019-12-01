function customerService(repository, authClient) {
  function formatMessage(name) {
    const message = `Hello ${name}`;
    return { message };
  }
  async function getById(id) {
    const user = await repository.getCustomerById(id);
    return user;
  }

  async function create(body) {
    const { password } = body;
    const user = await repository.create(body);
    const authentification = await authClient.upsertCredentials(user.id, password);
    console.log('Authentification ', authentification);
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
