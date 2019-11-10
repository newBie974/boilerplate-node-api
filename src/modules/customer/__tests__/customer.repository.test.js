const database = require('../../../database');
const customerRepository = require('../customer.repository')(database);

describe('Customer Repository', () => {
  test('Select a user by id 1', async () => {
    const user = await customerRepository.getCustomerById(1);
    expect(user).toMatchObject({
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
      nickname: 'Nickname',
      email: 'john@doe.com',
    });
  });
});
