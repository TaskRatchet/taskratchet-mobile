// __mocks__/firebase.js

import * as jest from 'jest';
const firebase = {
  initializeApp: jest.fn(),
  getAuth: jest.fn(() => ({
    onAuthStateChanged: jest.fn(),
    currentUser: {
      email: 'test@test.com',
    },
  })),
};

export default firebase;
