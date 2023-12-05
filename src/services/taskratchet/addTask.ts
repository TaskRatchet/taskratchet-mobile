import fetch1 from "./fetch1";

type Input = {
  task: string;
  due: string;
  cents: number;
};

// Requires that user be authenticated.
export async function addTask(input: Input): Promise<Response> {
  const response = await fetch1("me/tasks", true, "POST", input);

  if (!response.ok) {
    throw new Error("Failed to add task");
  }

  return response;
}
