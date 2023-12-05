import fetch1 from "./fetch1";

export async function getApiToken() {
  const response = await fetch1("me/token", true, "GET");
  return response?.text();
}
