const handler = require('../auth.handler');

describe('Auth Handler', () => {
  const mockServices = {
    upsertCredentials: jest.fn(() => 1),
  };
  const replyMock = {
    send: jest.fn().mockReturnThis(),
    code: jest.fn().mockReturnThis(),
  };
  const authHandler = handler(mockServices);
  test('should upsertCredentials', async () => {
    const req = {
      body: {
        id: 1,
        password: 'Coucou toi',
      },
    };
    await authHandler.upsertCredentials(req, replyMock);
    expect(replyMock.code).toHaveBeenCalledWith(200);
    expect(replyMock.send).toHaveBeenCalledWith(1);
  });
});
