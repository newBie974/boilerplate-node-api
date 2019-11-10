function customerRepository(database) {
  function getCustomerById(id) {
    return database.query(
      'SELECT id, nickname, email, firstname, lastname FROM customer WHERE id=$1::integer',
      [id],
    ).then((res) => res.rows[0]);
  }
  return {
    getCustomerById,
  };
}

module.exports = customerRepository;
