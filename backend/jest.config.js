/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.js'],
  verbose: true,
  forceExit: true,
  // clearMocks: true,
};