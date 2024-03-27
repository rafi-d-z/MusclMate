/** @returns {Promise<import('jest').Config>} */
module.exports = async () => {
  return {
    verbose: true,
    testEnvironment: 'node',
  testMatch: ['**/*.test.js'],
  forceExit: true,
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  };
};
// module.exports = {
//   preset: 'jest',
//   testEnvironment: 'node',
//   testMatch: ['**/*.test.js'],
//   verbose: true,
//   forceExit: true,
//   transform: {
//     '^.+\\.jsx?$': 'babel-jest',
//   },
// };