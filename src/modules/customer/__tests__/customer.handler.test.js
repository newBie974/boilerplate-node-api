
const handler = require('../customer.handler');

describe('customerHandler', () => {
  const mockServices = {
    formatMessage: jest.fn((name) => ({ message: `Hello ${name}` })),
  };
  const customerHandler = handler(mockServices);
  test('return 200: should get all', async () => {
    const req = {};
    const replyMock = {
      send: jest.fn().mockReturnThis(),
      code: jest.fn().mockReturnThis(),
    };
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
    const replyMock = {
      send: jest.fn().mockReturnThis(),
      code: jest.fn().mockReturnThis(),
    };
    await customerHandler.sendFormatMessage(req, replyMock);
    expect(replyMock.code).toHaveBeenCalledWith(200);
    expect(replyMock.send).toHaveBeenCalledWith({ message: 'Hello aymeric' });
  });
});
