type User = {
  username: string;
  password?: string;
  email: string;
};

const users: Record<string, User> = {
  User1: {
    username: 'John',
    password: '123456',
    email: 'John@gmail.com',
  },
  User2: {
    username: 'Jane',
    password: 'Janejane',
    email: 'Jane54@gmail.com',
  },
};

export default function checkCredentials(username: string, password: string) {
  const lowerCaseUsername = username.toLowerCase();
  const matchingUser = Object.values(users).find(
    user =>
      user.username.toLowerCase() === lowerCaseUsername ||
      user.email.toLowerCase() === lowerCaseUsername,
  );

  if (matchingUser && password === matchingUser.password) {
    const userPrivate = {...matchingUser};
    delete userPrivate.password;
    return userPrivate;
  } else {
    return null;
  }
}
