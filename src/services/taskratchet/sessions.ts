import {getAuth, signOut} from 'firebase/auth';

export type Session = {
  token: string;
  email: string;
};

// TODO: Add proper type
let sessionSubs: Array<CallableFunction> = [];

export function getSession(): Session | undefined {
  const email = window.localStorage.getItem('email');
  const token = window.localStorage.getItem('token');
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
export function publishSession(): void {
  const session: Session | undefined = getSession();

  sessionSubs.forEach((x: CallableFunction) => {
    x(session);
  });
}

// TODO: Should this function be in separate file?
export function logout(): void {
  window.localStorage.removeItem('email');
  window.localStorage.removeItem('token');
  window.localStorage.removeItem('firebase_token');

  const auth = getAuth();
  signOut(auth).catch(e => {
    // TODO find better logging
    console.log(e);
  });

  publishSession();
}
