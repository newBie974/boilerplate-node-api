const handler = require('../handler');

describe('Auth Handler', () => {
  const mockServices = {
    upsertCredentials: jest.fn(() => 1),
    authentification: jest.fn(() => true),
  };
  const replyMock = {
    send: jest.fn().mockReturnThis(),
    code: jest.fn().mockReturnThis(),
  };
  const authHandler = handler(mockServices);
  test('should upsertCredentials', async () => {
    const req = {
      body: {
        customerId: 1,
        password: 'Coucou toi',
      },
    };
    await authHandler.upsertCredentials(req, replyMock);
    expect(replyMock.code).toHaveBeenCalledWith(200);
    expect(replyMock.send).toHaveBeenCalledWith(1);
  });

  test('should authentification success', async () => {
    const req = {
      body: {
        customerId: 1,
        password: 'coucou',
      },
    };
    await authHandler.authentification(req, replyMock);
    expect(mockServices.authentification).toHaveBeenCalledTimes(1);
    expect(replyMock.code).toHaveBeenCalledWith(200);
    expect(replyMock.send).toHaveBeenCalledWith(1);
  });

  test('should authentification success', async () => {
    const req = {
      body: {
        customerId: 1,
        password: 'coucou',
      },
    };
    mockServices.authentification = jest.fn(() => false);
    await authHandler.authentification(req, replyMock);
    expect(mockServices.authentification).toHaveBeenCalledTimes(1);
    expect(replyMock.code).toHaveBeenCalledWith(401);
  });
});
