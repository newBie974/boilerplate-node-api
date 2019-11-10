module.exports = {
  verbose: true,
  testEnvironment: 'node',
  collectCoverage: true,
  setupFilesAfterEnv: ['<rootDir>/src/database/__tests__/bootstrap.js'],
  testMatch: ['**/*.test.js'],
  collectCoverageFrom: [
    './src/modules/**/*.js',
    '!jest.config.js',
    '!**/__tests__/**/*',
  ],
  // automock: false,
};
