function AuthClient(superagent, clients) {
  const {
    hostname,
    base,
    port,
  } = clients;
  async function upsertCredentials(customerId, password) {
    try {
      await superagent
        .post(`${base}://${hostname}:${port}/auth/`)
        .send({
          customerId,
          password,
        });
      return true;
    } catch (err) {
      throw new Error(`[AUTH-CLIENT ]-[CANNOT UPSERTCRENDENTIALS] ${err}`);
    }
  }

  async function authentification(customerId, password) {
    try {
      const authentificationResult = await superagent
        .post('/auth/token')
        .send({
          customerId,
          password,
        });
      return authentificationResult;
    } catch (err) {
      throw new Error(`[AUTH-CLIENT]-[CANNOT AUTHENTIFICATION] ${err}`);
    }
  }

  return {
    upsertCredentials,
    authentification,
  };
}

module.exports = AuthClient;
