function authRepository(database) {
  function upsertCredentials(customerId, password) {
    return database.query(`
      INSERT INTO credentials (customer_id, password, created_at, updated_at)
      VALUES ($1, $2, NOW(), NOW())
      ON CONFLICT (customer_id) DO UPDATE
      SET password = $3, updated_at = NOW()
      RETURNING customer_id AS "customerId"
    `, [customerId, password, password]).then((res) => res.rows[0]);
  }

  function getCredentials(customerId) {
    return database.query(`
      SELECT customer_id AS "customerId", password
      FROM credentials
      WHERE customer_id = $1
      LIMIT 1
    `, [customerId]).then((res) => res.rows[0]);
  }
  return {
    upsertCredentials,
    getCredentials,
  };
}

module.exports = authRepository;
