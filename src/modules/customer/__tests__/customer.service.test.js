const service = require('../service');

describe('Customer Service', () => {
  const mockRepository = {
    getAll: jest.fn(() => ([{
      id: 1,
      firstname: 'Doe',
      lastname: 'John',
      nickname: 'Nickname',
      email: 'john@doe.com',
    }])),
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
    getCustomerByEmail: jest.fn(() => ({
      id: 1,
      firstname: 'Doe',
      lastname: 'Jahn',
      nickname: 'Nickname',
      email: 'john@doe.com',
    })),
  };

  const mockAuthClient = {
    upsertCredentials: jest.fn(() => true),
    authentification: jest.fn(() => true),
    generateToken: jest.fn(() => true),
  };

  const nanoidMock = jest.fn(() => 1);
  const customerService = service(mockRepository, mockAuthClient, nanoidMock);

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

  test('should getAll customer', async () => {
    const users = await customerService.getAll();
    expect(mockRepository.getAll).toHaveBeenCalledTimes(1);
    expect(users).toMatchObject(
      [{
        id: 1,
        firstname: 'Doe',
        lastname: 'John',
        nickname: 'Nickname',
        email: 'john@doe.com',
      }],
    );
  });

  test('should create a customer', async () => {
    mockRepository.getCustomerByEmail = jest.fn(() => false);
    // [TODO] be deplace
    const payload = {
      firstname: 'Doe',
      lastname: 'John',
      nickname: 'Nickname',
      email: 'john@doe.com',
    };
    // [TODO] be deplace
    const user = await customerService.create(payload);
    expect(mockRepository.getCustomerByEmail).toHaveBeenCalledTimes(1);
    expect(mockRepository.create).toHaveBeenCalledTimes(1);
    expect(mockAuthClient.upsertCredentials).toHaveBeenCalledTimes(1);
    expect(user).toBe(true);
  });

  test('shouldnt create a customer because one already exist', async () => {
    mockRepository.getCustomerByEmail = jest.fn(() => true);
    const payload = {
      firstname: 'Doe',
      lastname: 'John',
      nickname: 'Nickname',
      email: 'john@doe.com',
    };
    try {
      await customerService.create(payload);
      expect(mockRepository.getCustomerByEmail).toHaveBeenCalledTimes(1);
    } catch (err) {
      // [TODO] expect throw error check it
      // How to test throwing error with jest
      console.log('-------> ici', err);
    }
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

  test('should login', async () => {
    mockRepository.getCustomerByEmail = jest.fn(() => true);
    const email = 'john@doe.com';
    const password = 'johndoe';
    await customerService.login(email, password);
    expect(mockRepository.getCustomerByEmail).toHaveBeenCalledTimes(1);
    expect(mockAuthClient.authentification).toHaveBeenCalledTimes(1);
    expect(mockAuthClient.generateToken).toHaveBeenCalledTimes(1);
  });

  test('shouldnt login', async () => {
    mockRepository.getCustomerByEmail = jest.fn(() => false);
    const email = 'john@doe.com';
    const password = 'johndoe';
    const login = await customerService.login(email, password);
    expect(mockRepository.getCustomerByEmail).toHaveBeenCalledTimes(1);
    expect(login).toBe(false);
  });
});
