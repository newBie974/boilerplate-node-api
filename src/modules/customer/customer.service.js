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
    const id = Date.now();
    const {
      password,
      firstname,
      lastname,
      email,
      nickname,
    } = body;
    const user = await repository.create({
      id,
      firstname,
      lastname,
      email,
      nickname,
    });
    const credentialsUpserted = await authClient.upsertCredentials(user.id, password);
    return credentialsUpserted;
  }

  async function update(id, body) {
    const user = await repository.update(id, body);
    return user;
  }

  async function getAll() {
    const users = await repository.getAll();
    return users;
  }

  async function login(email, password) {
    const user = await repository.getCustomerByEmail(email);
    if (!user) {
      return false;
    }
    await authClient.authentification(user.id, password);
    return true;
  }

  return {
    formatMessage,
    getById,
    create,
    update,
    getAll,
    login,
  };
}

module.exports = customerService;
