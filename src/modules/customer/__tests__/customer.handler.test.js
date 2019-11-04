
const handler = require('../customer.handler');

describe('customerHandler', () => {
  test('return 200: should get all', async () => {
    const replyMock = {
      send: jest.fn().mockReturnThis(),
      code: jest.fn().mockReturnThis(),
    };
    const req = {};
    handler.helloWorld(req, replyMock);
    expect(replyMock.send).toHaveBeenCalledWith({ message: 'hello world' });
    expect(replyMock.code).toHaveBeenCalledWith(200);
  });
});
