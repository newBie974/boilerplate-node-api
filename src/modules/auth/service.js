function authService(repository, authConfig, jwt, bcrypt) {
  async function upsertCredentials(id, password) {
    const hashedPassword = await bcrypt.hash(password, authConfig.saltRounds);
    const upsertedData = await repository.upsertCredentials(id, hashedPassword);
    return upsertedData;
  }
  async function authentification(id, password) {
    const credentials = await repository.authentification(id);
    if (!credentials) {
      return false;
    }
    const isSamePassword = await bcrypt.compare(password, credentials.password);
    if (!isSamePassword) {
      return false;
    }
    return true;
  }
  return {
    upsertCredentials,
    authentification,
  };
}

module.exports = authService;
