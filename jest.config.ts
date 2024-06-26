export default {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },

  moduleNameMapper: {
    '\\.(css|less|sass|scss|png|jpg|svg|webp)$': 'identity-obj-proxy',
    '^.+\\.svg$': 'jest-transformer-svg',
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@components/(.*)$': '<rootDir>/src/components/$1',
    '^@shared/(.*)$': '<rootDir>/src/shared/$1',
    '^@client/(.*)$': '<rootDir>/src/client/$1',
    '^@core/(.*)$': '<rootDir>/src/core/$1',
    '^@store/(.*)$': '<rootDir>/src/store/$1',
    '^@enums/(.*)$': '<rootDir>/src/enums/$1',
  },

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};
