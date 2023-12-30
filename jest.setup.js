import React from 'react';

jest.mock('react-native-screens', () => ({
  enableScreens: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  NavigationContainer: () => <div />,
}));

jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: jest.fn(() => ({
    Screen: jest.fn(),
    Navigator: jest.fn(),
  })),
}));

jest.mock('react-native-secure-key-store', () => ({
  set: jest.fn(),
  get: jest.fn(),
  remove: jest.fn(),
  ACCESSIBLE: {
    WHEN_UNLOCKED: 'WHEN_UNLOCKED',
    // Add other properties if needed
  },
}));
