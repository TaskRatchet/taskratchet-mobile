import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function getStoredTasks() {
  const tasks = await AsyncStorage.getItem('tasks');
  console.log('getStoredTasks ' + (await tasks) + ' from getStoredTasks');
  const parsedTasks = tasks !== null ? JSON.parse(tasks) : null;
  console.log(
    'parsedTasks ' +
      JSON.stringify(parsedTasks, null, 2) +
      ' from getStoredTasks',
  );
  return parsedTasks != null ? parsedTasks : null;
}
