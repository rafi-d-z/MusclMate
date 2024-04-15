/* eslint-env node */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.tsx', '**/*.test.tsx'],
  verbose: true,
  forceExit: true,
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  }
}