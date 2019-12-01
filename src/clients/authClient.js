function AuthClient(superagent, clients) {
  const {
    hostname,
    base,
    port,
  } = clients;
  async function upsertCredentials(id, password) {
    try {
      await superagent
        .post(`${base}://${hostname}:${port}/auth/`)
        .send({
          id,
          password,
        });
      return true;
    } catch (err) {
      throw new Error(`[AUTH-CLIENT ]-[CANNOT UPSERTCRENDENTIALS] ${err}`);
    }
  }

  async function authentification(id, password) {
    try {
      const authentificationResult = await superagent
        .post('/auth/token')
        .send({
          id,
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
