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

  test('Insert a user with payload', async () => {
    const payload = {
      firstname: 'Jane',
      lastname: 'Doe',
      nickname: 'Nickname 1',
      email: 'jane@doe.com',
    };
    const user = await customerRepository.create(payload);
    expect(user).toMatchObject({
      id: 2,
      firstname: 'Jane',
      lastname: 'Doe',
      nickname: 'Nickname 1',
      email: 'jane@doe.com',
    });
  });

  test('Update a user with payload', async () => {
    const payload = {
      firstname: 'Janette',
      lastname: 'Doe',
      nickname: 'Nickname Todo',
      email: 'jane@doe.com',
    };
    const user = await customerRepository.update(1, payload);
    expect(user).toMatchObject({
      id: 1,
      firstname: 'Janette',
      lastname: 'Doe',
      nickname: 'Nickname Todo',
      email: 'jane@doe.com',
    });
  });

  test('Select a user by id 1', async () => {
    const users = await customerRepository.getAll();
    expect(users).toMatchObject([{
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
      nickname: 'Nickname',
      email: 'john@doe.com',
    }]);
  });
});
