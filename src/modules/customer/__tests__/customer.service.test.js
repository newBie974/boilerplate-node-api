const service = require('../customer.service');

describe('customer service', () => {
  const mockRepository = {
    getCustomerById: jest.fn((id) => ({
      id,
      firstname: 'Doe',
      lastname: 'John',
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
});
