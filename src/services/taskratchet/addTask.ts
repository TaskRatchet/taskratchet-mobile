import fetch1 from './fetch1';

type Input = {
  task: string;
  due: Date;
  cents: number;
};

// Requires that user be authenticated.
export async function addTask(input: Input): Promise<Response> {
  const response = await fetch1('me/tasks', true, 'POST', {
    ...input,
    due: formatDate(input.due),
  });

  if (!response.ok) {
    throw new Error('Failed to add task');
  }

  return response;
}

// convert date to format "2/21/2022, 11:59 PM"
function formatDate(date: Date): string {
  const month = date.getMonth() + 1; // getMonth() starts at 0
  const day = date.getDate();
  const year = date.getFullYear();

  let hour = date.getHours();
  const minutes = date.getMinutes();
  const period = hour < 12 ? 'AM' : 'PM';

  // Convert to 12-hour time
  if (hour > 12) {
    hour -= 12;
  } else if (hour === 0) {
    hour = 12; // handle 0 hours (midnight)
  }

  // Make sure minutes have leading zeros if required
  const mm = minutes < 10 ? `0${minutes}` : minutes.toString();
  const result = `${month}/${day}/${year}, ${hour}:${mm} ${period}`;
  return result;
}
