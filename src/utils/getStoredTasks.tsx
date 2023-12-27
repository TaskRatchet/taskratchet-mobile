import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function getStoredTasks() {
  const tasks = await AsyncStorage.getItem('tasks');

  if (tasks === null) {
    throw new Error('No tasks found in storage');
  }

  const parsedTasks = tasks !== null ? JSON.parse(tasks) : null;
  return parsedTasks != null ? parsedTasks : null;
}
