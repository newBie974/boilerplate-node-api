function authService(repository, auth, jwt, bcrypt) {
  async function upsertCredentials(id, password) {
    const hashedPassword = await bcrypt.hash(password, auth.saltRounds);
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
