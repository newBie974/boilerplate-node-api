const customerService = require('../customer.service');

describe('customer service', () => {
  test('should return hello Aymeric', () => {
    const messageToFormat = 'Aymeric';
    const message = customerService.formatMessage(messageToFormat);
    expect(message).toMatchObject({
      message: 'Hello Aymeric',
    });
  });
});
