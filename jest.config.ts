module.exports = {
  collectCoverage: false,
  collectCoverageFrom: ['src/**/*', '!src/types/**/*'],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  globals: {
    'ts-jest': {
      tsconfig: 'test/tsconfig.json',
      diagnostics: {
        ignoreCodes: ['TS151001'],
      },
    },
  },
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  moduleDirectories: ['node_modules', 'src'],
  preset: 'ts-jest',
  testRegex: 'test/.*?\\.(test|spec)\\.tsx?$',
  verbose: false,
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
