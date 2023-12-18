import AsyncStorage from '@react-native-async-storage/async-storage';

export default async function getStoredUser() {
  const me = await AsyncStorage.getItem('me');
  return me != null ? JSON.parse(me) : null;
}
