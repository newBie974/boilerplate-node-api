function authRepository(database) {
  function upsertCredentials(id, password) {
    return database.query(`
      INSERT INTO credentials (customer_id, password, created_at, updated_at)
      VALUES ($1, $2, NOW(), NOW())
      ON CONFLICT (customer_id) DO UPDATE
      SET password = $3, updated_at = NOW()
    `, [id, password, password]).then((res) => res.rowCount);
  }

  function getCredentials(id) {
    return database.query(`
      SELECT customer_id::integer AS "customerId", password
      FROM credentials
      WHERE customer_id = $1
      LIMIT 1
    `, [id]).then((res) => res.rows[0]);
  }
  return {
    upsertCredentials,
    getCredentials,
  };
}

module.exports = authRepository;
