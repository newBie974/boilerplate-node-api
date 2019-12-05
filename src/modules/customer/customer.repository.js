function customerRepository(database) {
  function getAll() {
    return database.query(
      'SELECT id, nickname, email, firstname, lastname FROM customer',
    ).then((res) => res.rows);
  }

  function getCustomerById(id) {
    return database.query(
      'SELECT id, nickname, email, firstname, lastname FROM customer WHERE id=$1::integer LIMIT 1',
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
  return {
    getAll,
    getCustomerById,
    create,
    update,
  };
}

module.exports = customerRepository;
