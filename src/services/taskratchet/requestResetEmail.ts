import fetch1 from "./fetch1";

export async function requestResetEmail(email: string): Promise<Response> {
  return fetch1("account/forgot-password", false, "POST", {
    email,
  });
}
