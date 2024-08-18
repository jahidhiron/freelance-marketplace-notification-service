// to learn more about compilerOptions, please visit notes/7-test/1-jest.config.ts.txt
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  coverageDirectory: 'coverage',
  collectCoverage: true,
  testPathIgnorePatterns: ['/node_modules'],
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  testMatch: ['<rootDir>/src/**/test/*.ts'],
  collectCoverageFrom: ['src/**/*.ts', '!src/**/test/*.ts?(x)', '!**/node_modules/**'],
  coverageThreshold: {
    global: {
      branches: 1,
      functions: 1,
      lines: 1,
      statements: 1
    }
  },
  coverageReporters: ['text-summary', 'lcov'],
  moduleNameMapper: {
    '@notifications/(.*)': ['<rootDir>/src/$1']
  }
};

export default config;
