import AsyncStorage from '@react-native-async-storage/async-storage';

export type Session = {
  token: string;
  email: string;
};

// TODO: Add proper type
let sessionSubs: Array<CallableFunction> = [];

export async function getSession(): Promise<Session | undefined> {
  const email = await AsyncStorage.getItem('email');
  const token = await AsyncStorage.getItem('token');
  if (email && token) {
    return {email, token};
  }
}

export function subscribeToSession(callback: CallableFunction): void {
  sessionSubs.push(callback);
}

export function unsubscribeFromSession(callback: CallableFunction): void {
  sessionSubs = sessionSubs.filter((x: CallableFunction) => x !== callback);
}

// TODO: Should this function be in separate file?
export async function publishSession(): Promise<void> {
  const session: Session | undefined = await getSession();

  sessionSubs.forEach((x: CallableFunction) => {
    x(session);
  });
}

// TODO: Should this function be in separate file?
export function logout(): void {
  AsyncStorage.removeItem('email');
  AsyncStorage.removeItem('token');

  publishSession();
}
