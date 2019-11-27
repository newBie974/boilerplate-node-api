const database = require('../../../database');
const authRepository = require('../auth.repository')(database);

describe('Auth Repository', () => {
  const id = 1;
  const password = 'myPasswordHashed';

  test('should insert credentials', async () => {
    await authRepository.upsertCredentials(id, password);
    const user = await database.query('SELECT customer_id::integer, password FROM credentials WHERE customer_id= $1 LIMIT 1', [id])
      .then((res) => res.rows[0]);
    expect(user.customer_id).toBe(id);
    expect(user.password).toBe(password);
  });

  test('should update password for an existing credentials', async () => {
    await authRepository.upsertCredentials(id, password);
    const newPassword = 'myNewPassword';
    await authRepository.upsertCredentials(id, newPassword);
    const user = await database.query('SELECT customer_id::integer, password FROM credentials WHERE customer_id= $1 LIMIT 1', [id])
      .then((res) => res.rows[0]);
    expect(user.password).toBe(newPassword);
  });
});
