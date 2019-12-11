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
      const login = await superagent
        .post(`${base}://${hostname}:${port}/auth/token`)
        .send({
          customerId,
          password,
        });
      return login;
    } catch (err) {
      throw new Error(`[AUTH-CLIENT]-[CANNOT AUTHENTIFICATION] ${err}`);
    }
  }

  async function generateToken(customerId, email, nickname) {
    try {
      return superagent
        .post(`${base}://${hostname}:${port}/auth/generate_token`)
        .send({
          customerId,
          email,
          nickname,
        }).then((res) => res.body);
    } catch (err) {
      throw new Error(`[AUTH-CLIENT]-[CANNOT GENERATE TOKEN] ${err}`);
    }
  }
  return {
    upsertCredentials,
    authentification,
    generateToken,
  };
}

module.exports = AuthClient;
