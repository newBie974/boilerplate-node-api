
const handler = require('../customer.handler');

describe('customerHandler', () => {
  const mockServices = {
    formatMessage: jest.fn((name) => ({ message: `Hello ${name}` })),
    getById: jest.fn((id) => ({
      id,
      firstname: 'Doe',
      lastname: 'John',
      nickname: 'Nickname',
      email: 'john@doe.com',
    })),
  };
  const customerHandler = handler(mockServices);
  const replyMock = {
    send: jest.fn().mockReturnThis(),
    code: jest.fn().mockReturnThis(),
  };

  test('return 200: should get all', async () => {
    const req = {};
    customerHandler.helloWorld(req, replyMock);
    expect(replyMock.send).toHaveBeenCalledWith({ message: 'hello world' });
    expect(replyMock.code).toHaveBeenCalledWith(200);
  });

  test('return 200: should get with params :name', async () => {
    const req = {
      params: {
        name: 'aymeric',
      },
    };
    await customerHandler.sendFormatMessage(req, replyMock);
    expect(replyMock.code).toHaveBeenCalledWith(200);
    expect(replyMock.send).toHaveBeenCalledWith({ message: 'Hello aymeric' });
  });

  test('return 200: should get with params :id', async () => {
    const req = {
      params: {
        id: 1,
      },
    };
    await customerHandler.getById(req, replyMock);
    expect(replyMock.code).toHaveBeenCalledWith(200);
    expect(replyMock.send).toHaveBeenCalledWith({
      id: 1,
      firstname: 'Doe',
      lastname: 'John',
      nickname: 'Nickname',
      email: 'john@doe.com',
    });
  });
});
