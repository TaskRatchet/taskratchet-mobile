module.exports = {
  preset: 'react-native',
  moduleNameMapper: {
    // Match all files ending in `.png` or other image formats if needed
    '\\.(png)$': '<rootDir>/__mocks__/fileMock.js',
  },
  setupFilesAfterEnv: ['./jest.setup.js'],
};
