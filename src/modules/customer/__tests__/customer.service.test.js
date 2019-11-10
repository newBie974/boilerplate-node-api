const service = require('../customer.service');

describe('customer service', () => {
  const customerService = service();
  test('should return hello Aymeric', () => {
    const messageToFormat = 'Aymeric';
    const message = customerService.formatMessage(messageToFormat);
    expect(message).toMatchObject({
      message: 'Hello Aymeric',
    });
  });
});
