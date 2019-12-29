function customerService(repository, authClient, nanoid) {
  async function getById(id) {
    const user = await repository.getCustomerById(id);
    return user;
  }

  async function create({
    password,
    firstname,
    lastname,
    email,
    nickname,
  }) {
    const id = nanoid();
    const getCustomerByEmail = await repository.getCustomerByEmail(email);
    if (getCustomerByEmail) {
      throw new Error('[CUSTOMER] - email does exist');
    }
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
    const { token } = await authClient.generateToken(user.id, user.email, user.nickname);
    return { token, id: user.id };
  }

  return {
    getById,
    create,
    update,
    getAll,
    login,
  };
}

module.exports = customerService;
