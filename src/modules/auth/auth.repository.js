function authRepository(database) {
  function upsertCredentials(id, password) {
    return database.query(`
      INSERT INTO credentials (customer_id, password, created_at, updated_at)
      VALUES ($1, $2, NOW(), NOW())
      ON CONFLICT (customer_id) DO UPDATE
      SET password = $3, updated_at = NOW()
    `, [id, password, password]);
  }
  return {
    upsertCredentials,
  };
}

module.exports = authRepository;
