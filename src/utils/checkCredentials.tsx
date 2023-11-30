const users: {[key: string]: string} = {
  John: '123456',
};

export default function checkCredentials(username: string, password: string) {
  if (users.hasOwnProperty(username) && password === users[username]) {
    return true;
  } else {
    return false;
  }
}
