/* eslint-env node */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/*.test.ts', '**/*.test.tsx'],
  verbose: true,
  forceExit: true,
  clearMocks: true,
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(png|jpg|jpeg|gif|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
  /* "moduleFileExtensions": [
    "js",
    "png" // Add "png" to the list of file extensions to ignore
  ] */
}