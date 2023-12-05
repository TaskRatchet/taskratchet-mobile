import fetch1 from "./fetch1";

export type Card = {
  brand: string;
  last4: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  timezone: string;
  cards: Card[];
  integrations: {
    beeminder: {
      user: string;
      goal_new_tasks: string;
    };
  };
  has_stripe_customer: boolean;
};

export async function getMe(): Promise<User> {
  const response = await fetch1("me", true);

  if (!response.ok) {
    throw new Error("Failed to get me");
  }

  return response.json() as Promise<User>;
}
