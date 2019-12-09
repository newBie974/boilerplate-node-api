const AuthClient = require('./authClient');

function initClients({ superagent, clients }) {
  const authClient = AuthClient(superagent, clients);
  return {
    authClient,
  };
}

module.exports = initClients;
