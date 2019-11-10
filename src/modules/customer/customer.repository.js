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
      firstname,
      lastname,
      nickname,
      email,
    } = payload;

    const result = await database.query(`
      INSERT INTO customer (firstname, lastname, email, nickname)
      VALUES
      ($1, $2, $3, $4)
      RETURNING id, firstname, lastname, email, nickname
    `, [firstname, lastname, email, nickname])
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
        firstname = $2,
        lastname = $3,
        email = $4,
        nickname = $5
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
