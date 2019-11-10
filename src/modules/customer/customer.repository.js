function customerRepository(database) {
  function getCustomerById(id) {
    return database.query(
      'SELECT id, nickname, email, firstname, lastname FROM customer WHERE id=$1::integer',
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
  return {
    getCustomerById,
    create,
  };
}

module.exports = customerRepository;
