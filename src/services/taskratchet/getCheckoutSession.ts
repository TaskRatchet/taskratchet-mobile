import fetch1 from "./fetch1";

export interface CheckoutSession {
  id: string;
}

export async function getCheckoutSession(): Promise<CheckoutSession> {
  const response = await fetch1("payments/checkout/session");

  return response.json() as Promise<CheckoutSession>;
}
