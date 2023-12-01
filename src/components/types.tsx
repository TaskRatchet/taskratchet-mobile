// types.ts
export type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  deadline: string;
  stakes: string;
};

export type Tasks = {
  [key: string]: Task;
};
