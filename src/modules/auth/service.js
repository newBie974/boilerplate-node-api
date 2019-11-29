function authService(repository, authConfig, jwt, bcrypt) {
  async function upsertCredentials(id, password) {
    const hashedPassword = await bcrypt.hash(password, authConfig.saltRounds);
    const upsertedData = await repository.upsertCredentials(id, hashedPassword);
    return upsertedData;
  }
  return {
    upsertCredentials,
  };
}

module.exports = authService;
