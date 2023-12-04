// mockData.ts
import {taskType, tasksType} from '../components/types';

const tasks: tasksType = {
  0o0: {
    id: 0o4,
    title: 'Write blog post',
    description: 'Write a blog post about the latest JavaScript features.',
    completed: false,
    deadline: '2023-12-04', // Due today
    stakes: '$20',
  },
  0o1: {
    id: 0o5,
    title: 'Read a book',
    description: 'Read "The Pragmatic Programmer" book.',
    completed: false,
    deadline: '2023-12-05', // Due tomorrow
    stakes: '$15',
  },
  0o2: {
    id: 0o6,
    title: 'Attend conference',
    description: 'Attend the virtual Web Development conference.',
    completed: false,
    deadline: '2023-12-03', // Due yesterday
    stakes: '$10',
  },
  0o3: {
    id: 0o7,
    title: 'Visit doctor',
    description: 'Have a regular check-up with the doctor.',
    completed: false,
    deadline: '2023-11-01', // Past due
    stakes: '$20',
  },
  0o4: {
    id: 0o10,
    title: 'Clean the house',
    description: 'Do a general cleaning of the house.',
    completed: false,
    deadline: '2024-12-04', // Due within the next year
    stakes: '$15',
  },
  0o5: {
    id: 0o11,
    title: 'Finish online course',
    description: 'Finish the remaining modules of the online course.',
    completed: false,
    deadline: '2024-06-04', // Due within the next year
    stakes: '$20',
  },
  0o6: {
    id: 0o12,
    title: 'Write a novel',
    description: 'Write a novel about the recent event.',
    completed: false,
    deadline: '2023-01-04', // Due within the next year
    stakes: '$15',
  },
  0o7: {
    id: 0o13,
    title: 'Write a report',
    description: 'Write a report about the recent project.',
    completed: false,
    deadline: '2024-01-04', // Due within the next year
    stakes: '$15',
  },
  0o10: {
    id: 0o14,
    title: 'Clean the house',
    description: 'Deep clean the entire house before the holidays.',
    completed: false,
    deadline: '2023-12-20', // Due within the next year
    stakes: '$50',
  },
  0o11: {
    id: 0o11,
    title: 'Complete Python course',
    description: 'Finish the Python for Data Science course on Coursera.',
    completed: false,
    deadline: '2023-12-31', // Due within the next year
    stakes: '$100',
  },
  0o12: {
    id: 0o12,
    title: 'Write a novel',
    description: 'Complete the first draft of the science fiction novel.',
    completed: false,
    deadline: '2024-06-01', // Due within the next year
    stakes: '$200',
  },
  0o13: {
    id: 0o13,
    title: 'Prepare annual report',
    description: 'Compile data and write the annual financial report.',
    completed: false,
    deadline: '2024-01-15', // Due within the next year
    stakes: '$150',
  },
  0o14: {
    id: 0o14,
    title: 'Plan summer vacation',
    description: 'Research and plan the family vacation for summer 2024.',
    completed: false,
    deadline: '2024-04-30', // Due within the next year
    stakes: '$75',
  },
};
export default tasks;
