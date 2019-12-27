function customerRepository(database) {
  function getAll() {
    return database.query(
      'SELECT id, nickname, email, firstname, lastname FROM customer',
    ).then((res) => res.rows);
  }

  function getCustomerById(id) {
    return database.query(
      'SELECT id, nickname, email, firstname, lastname FROM customer WHERE id=$1 LIMIT 1',
      [id],
    ).then((res) => res.rows[0]);
  }

  async function create(payload) {
    const {
      id,
      firstname,
      lastname,
      nickname,
      email,
    } = payload;

    const result = await database.query(`
      INSERT INTO customer (id, firstname, lastname, email, nickname)
      VALUES
      ($1, $2, $3, $4, $5)
      RETURNING id, firstname, lastname, email, nickname
    `, [id, firstname, lastname, email, nickname])
      .then((res) => res.rows[0]);

    return result;
  }

  async function update(id, payload) {
    const {
      firstname,
      lastname,
      nickname,
      email,
    } = payload;

    const result = await database.query(`
      UPDATE customer SET 
        firstname = COALESCE($2, firstname),
        lastname = COALESCE($3, lastname),
        email = COALESCE($4, email),
        nickname = COALESCE($5, nickname)
      WHERE id = $1
      RETURNING id, firstname, lastname, email, nickname
    `, [id, firstname, lastname, email, nickname])
      .then((res) => res.rows[0]);

    return result;
  }

  async function getCustomerByEmail(email) {
    return database.query(
      'SELECT id, nickname, email, firstname, lastname FROM customer WHERE email=$1 LIMIT 1',
      [email],
    ).then((res) => res.rows[0]);
  }
  return {
    getAll,
    getCustomerById,
    create,
    update,
    getCustomerByEmail,
  };
}

module.exports = customerRepository;
