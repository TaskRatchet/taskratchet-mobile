export const initializeApp = jest.fn();

export const getAuth = jest.fn(() => ({
  onAuthStateChanged: jest.fn(),
  currentUser: {
    email: 'test@test.com',
  },
}));

export default {
  initializeApp,
  getAuth,
};
