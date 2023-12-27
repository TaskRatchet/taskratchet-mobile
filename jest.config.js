module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    // Match all files ending in `.png` or other image formats if needed
    '\\.(jpg|jpeg|png|gif)$': '<rootDir>/__mocks__/fileMock.js',
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
};
