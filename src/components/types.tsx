// types.ts
export type taskType = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  deadline: string;
  stakes: string;
};

export type tasksType = {
  [key: string]: taskType;
};
