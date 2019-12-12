function authService(repository, auth, jwt, bcrypt, jwtConfig) {
  async function upsertCredentials(id, password, email, nickname) {
    const hashedPassword = await bcrypt.hash(password, auth.saltRounds);
    const upsertedData = await repository.upsertCredentials(id, hashedPassword, email, nickname);
    return upsertedData;
  }
  async function authentification(id, password) {
    const credentials = await repository.getCredentials(id);
    if (!credentials) {
      return false;
    }
    const isSamePassword = await bcrypt.compare(password, credentials.password);
    if (!isSamePassword) {
      return false;
    }
    return true;
  }

  function generateToken(id, email, nickname) {
    const jwtConfigCopy = { ...jwtConfig, subject: id };
    const storeData = {
      id,
      email,
      nickname,
    };
    const token = jwt.sign(storeData, jwtConfig.privateKey, jwtConfigCopy.signOptions);
    return token;
  }
  return {
    upsertCredentials,
    authentification,
    generateToken,
  };
}

module.exports = authService;
