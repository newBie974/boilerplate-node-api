const service = require('../customer.service');

describe('Customer Service', () => {
  const mockRepository = {
    getCustomerById: jest.fn((id) => ({
      id,
      firstname: 'Doe',
      lastname: 'John',
      nickname: 'Nickname',
      email: 'john@doe.com',
    })),
    create: jest.fn(() => ({
      id: 1,
      firstname: 'Doe',
      lastname: 'John',
      nickname: 'Nickname',
      email: 'john@doe.com',
    })),
    update: jest.fn(() => ({
      id: 1,
      firstname: 'Doe',
      lastname: 'Jahn',
      nickname: 'Nickname',
      email: 'john@doe.com',
    })),
  };
  const customerService = service(mockRepository);

  test('should return hello John', () => {
    const messageToFormat = 'John';
    const message = customerService.formatMessage(messageToFormat);
    expect(message).toMatchObject({
      message: 'Hello John',
    });
  });

  test('should get by Id', async () => {
    const id = 1;
    const user = await customerService.getById(id);
    expect(mockRepository.getCustomerById).toHaveBeenCalledWith(1);
    expect(user).toMatchObject({
      id,
      firstname: 'Doe',
      lastname: 'John',
      nickname: 'Nickname',
      email: 'john@doe.com',
    });
  });

  test('should create a customer', async () => {
    const payload = {
      firstname: 'Doe',
      lastname: 'John',
      nickname: 'Nickname',
      email: 'john@doe.com',
    };
    const user = await customerService.create(payload);
    expect(mockRepository.create).toHaveBeenCalledTimes(1);
    expect(user).toMatchObject({
      id: 1,
      firstname: 'Doe',
      lastname: 'John',
      nickname: 'Nickname',
      email: 'john@doe.com',
    });
  });

  test('should update a customer', async () => {
    const payload = {
      firstname: 'Doe',
      lastname: 'Jahn',
      nickname: 'Nickname',
      email: 'john@doe.com',
    };
    const user = await customerService.update(1, payload);
    expect(mockRepository.update).toHaveBeenCalledTimes(1);
    expect(user).toMatchObject({
      id: 1,
      firstname: 'Doe',
      lastname: 'Jahn',
      nickname: 'Nickname',
      email: 'john@doe.com',
    });
  });
});
