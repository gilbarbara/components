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
  snapshotSerializers: ['@emotion/jest/serializer'],
  setupFilesAfterEnv: ['<rootDir>/test/__setup__/setupFilesAfterEnv.ts'],
  testEnvironment: '@happy-dom/jest-environment',
  testRegex: 'test/.*?\\.(test|spec)\\.tsx?$',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'test/tsconfig.json',
        diagnostics: {
          ignoreCodes: ['TS151001'],
        },
      },
    ],
  },
  verbose: false,
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
