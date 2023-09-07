import { Config } from 'jest';

const config: Config = {
  collectCoverage: false,
  collectCoverageFrom: ['src/modules/**/*', '!src/**/*.snap'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  snapshotSerializers: ['@emotion/jest/serializer'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
  testEnvironment: 'jsdom',
  testRegex: '.*?\\.(test|spec)\\.tsx?$',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: 'tsconfig.json',
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

export default config;
