const service = require('../service');

describe('Auth Service', () => {
  const id = 1;
  const password = 'myPassword';

  const mockRepository = {
    upsertCredentials: jest.fn(() => 1),
    authentification: jest.fn(() => true),
    getCredentials: jest.fn(() => true),
  };
  const mockBCrypt = {
    hash: jest.fn(() => 'hashedPassword'),
    compare: jest.fn(() => true),
  };
  const mockConfig = {};
  const mockJwt = {};

  const authService = service(mockRepository, mockConfig, mockJwt, mockBCrypt);

  test('should hashed password and save the credentials', async () => {
    const upsertCredentials = await authService.upsertCredentials(id, password);
    expect(mockBCrypt.hash).toHaveBeenCalledTimes(1);
    expect(mockRepository.upsertCredentials).toHaveBeenCalledTimes(1);
    expect(upsertCredentials).toBe(1);
  });

  test('should authentificate', async () => {
    const authentificate = await authService.authentification(id, password);
    expect(authentificate).toBe(true);
    expect(mockRepository.getCredentials).toHaveBeenCalledTimes(1);
    expect(mockBCrypt.compare).toHaveBeenCalledTimes(1);
  });

  test('should authentificate and failed authentificate on credentials', async () => {
    mockRepository.getCredentials = jest.fn(() => false);
    mockBCrypt.compare = jest.fn(() => true);
    const authentificate = await authService.authentification(id, password);
    expect(authentificate).toBe(false);
    expect(mockRepository.getCredentials).toHaveBeenCalledTimes(1);
    expect(mockBCrypt.compare).toHaveBeenCalledTimes(0);
  });

  test('should authentificate and failed authentificate on password', async () => {
    mockRepository.getCredentials = jest.fn(() => true);
    mockBCrypt.compare = jest.fn(() => false);
    const authentificate = await authService.authentification(id, password);
    expect(authentificate).toBe(false);
    expect(mockRepository.getCredentials).toHaveBeenCalledTimes(1);
    expect(mockBCrypt.compare).toHaveBeenCalledTimes(1);
  });
});
