const service = require('../service');

describe('Auth Service', () => {
  const id = 1;
  const password = 'myPassword';

  const mockRepository = {
    upsertCredentials: jest.fn(() => 1),
  };
  const mockBCrypt = {
    hash: jest.fn(() => 'hashedPassword'),
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
});
