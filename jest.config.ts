export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  moduleNameMapper: {
    '\\.(css|less|sass|scss|png|jpg|svg)$': 'identity-obj-proxy',
    '^.+\\.svg$': 'jest-transformer-svg',
    // '@/*': './src/*',
    // '@components/*': './src/components/*',
    // '@shared/*': './src/shared/*',
    // '@client/*': './src/client/*',
    // '@core/*': './src/core/*',
    // '@store/*': './src/store/*',
    // '@enums/*': './src/enums/*',
  },

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
