module.exports = {
  collectCoverage: false,
  collectCoverageFrom: ['src/modules/**/*'],
  coverageThreshold: {
    global: {
      branches: 15,
      functions: 15,
      lines: 15,
      statements: 15,
    },
  },
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  snapshotSerializers: ['@emotion/jest/serializer'],
  setupFilesAfterEnv: ['<rootDir>/test/__setup__/setupFilesAfterEnv.ts'],
  testEnvironment: '@happy-dom/jest-environment',
  testRegex: 'test/.*?\\.(test|spec)\\.tsx?$',
  transform: {
    '^.+\\.m?[tj]sx?$': [
      'ts-jest',
      {
        useESM: true,
        diagnostics: {
          ignoreCodes: ['TS151001'],
        },
      },
    ],
  },
  transformIgnorePatterns: ['node_modules/(?!(react-merge-refs)/)'],
  verbose: false,
  watchPathIgnorePatterns: ['<rootDir>/node_modules/'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
