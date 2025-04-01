import { Config } from 'jest';

const config: Config = {
  rootDir: './',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleNameMapper: {
    '^infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
    '^modules/(.*)$': '<rootDir>/src/modules/$1',
  },
  testMatch: ['**/*.spec.ts'],
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/main.ts',
    '!src/**/*.module.ts',
    '!src/**/*.dto.ts',
    '!src/**/*.entity.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  moduleFileExtensions: ['js', 'json', 'ts'],
};

export default config;
