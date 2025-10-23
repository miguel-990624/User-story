module.exports = {
  transform: {
    '^.+\\.tsx?$': 'babel-jest'
  },
  extensionsToTreatAsEsm: ['.ts'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1'
  }
};
