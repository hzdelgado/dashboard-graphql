/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

const config: Config = {
  clearMocks: true,
  // A preset that is used as a base for Jest's configuration
  preset: 'ts-jest',
  // A map from regular expressions to paths to transformers
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': 'ts-jest',
  },
  // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
  // A list of paths to modules that run some code to configure or set up the testing framework before each test
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  // The test environment that will be used for testing
  testEnvironment: "jsdom",
   // Indicates whether the coverage information should be collected while executing the test
   collectCoverage: true,
   // The directory where Jest should output its coverage files
   coverageDirectory: "coverage",
   // Indicates which provider should be used to instrument code for coverage
   coverageProvider: "v8",
   testPathIgnorePatterns: ["/tests-node/", "<rootDir>/tests/playwright/"], // Ignorar pruebas específicas para Node

};

export default config;
