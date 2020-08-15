const randomChar = require('./randomChar');

test('returns a string', () => {
  expect(typeof randomChar()).toBe('string');
});