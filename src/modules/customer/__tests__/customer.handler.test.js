
const handler = require('../customer.handler');

describe('Customer Handler', () => {
  const mockServices = {
    formatMessage: jest.fn((name) => ({ message: `Hello ${name}` })),
    getById: jest.fn((id) => ({
      id,
      firstname: 'Doe',
      lastname: 'John',
      nickname: 'Nickname',
      email: 'john@doe.com',
    })),
    create: jest.fn((payload) => ({
      id: 1,
      firstname: payload.firstname,
      lastname: payload.lastname,
      nickname: payload.nickname,
      email: payload.email,
    })),
    update: jest.fn((id, payload) => ({
      id: 1,
      firstname: payload.firstname,
      lastname: payload.lastname,
      nickname: payload.nickname,
      email: payload.email,
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

  test('return 404: shouldnt get with params :id', async () => {
    const req = {
      params: {
        id: 999,
      },
    };
    mockServices.getById = jest.fn(() => undefined);
    await customerHandler.getById(req, replyMock);
    expect(mockServices.getById).toHaveBeenCalledTimes(1);
    expect(replyMock.code).toHaveBeenCalledWith(404);
    expect(replyMock.send).toHaveBeenCalledWith('[CUSTOMER] couldnt find by id');
  });

  test('return 201: should created customer', async () => {
    const req = {
      body: {
        firstname: 'John',
        lastname: 'Doe',
        nickname: 'JohnDoe123',
        email: 'john@doe.gmail.com',
      },
    };
    await customerHandler.create(req, replyMock);
    expect(mockServices.create).toHaveBeenCalledTimes(1);
    expect(replyMock.code).toHaveBeenCalledWith(200);
    expect(replyMock.send).toHaveBeenCalledWith({
      id: 1,
      firstname: 'John',
      lastname: 'Doe',
      nickname: 'JohnDoe123',
      email: 'john@doe.gmail.com',
    });
  });

  test('return 200: should updated customer', async () => {
    const req = {
      params: 1,
      body: {
        firstname: 'Janette',
        lastname: 'Doe',
        nickname: 'JohnDoe123',
        email: 'john@doe.gmail.com',
      },
    };
    await customerHandler.update(req, replyMock);
    expect(mockServices.update).toHaveBeenCalledTimes(1);
    expect(replyMock.code).toHaveBeenCalledWith(200);
    expect(replyMock.send).toHaveBeenCalledWith({
      id: 1,
      firstname: 'Janette',
      lastname: 'Doe',
      nickname: 'JohnDoe123',
      email: 'john@doe.gmail.com',
    });
  });
});
