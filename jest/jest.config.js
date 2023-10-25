require('jest-preset-angular/ngcc-jest-processor');

const { myndExtendJestConfig } = require('@myndmanagement/test');

module.exports = myndExtendJestConfig({
  rootDir: `${__dirname}/../`,
  setupFilesAfterEnv: [
    '<rootDir>/jest/jest.setup.ts'
  ],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.spec.json',
    },
  },
  haste: {
    forceNodeFilesystemAPI: true,
  },
  moduleNameMapper: {
    "@environment": "<rootDir>/src/environments/environment.ts"
  },
});
