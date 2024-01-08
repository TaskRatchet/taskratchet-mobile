import AsyncStorage from '@react-native-async-storage/async-storage';

import {TaskType} from '../components/types';

export default async function getStoredTasks(): Promise<TaskType[]> {
  const tasks = await AsyncStorage.getItem('tasks');

  if (tasks === null) {
    throw new Error('No tasks found in storage');
  }

  const parsedTasks = JSON.parse(tasks) as TaskType[];
  return parsedTasks != null ? parsedTasks : [];
}
