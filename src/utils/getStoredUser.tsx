import AsyncStorage from '@react-native-async-storage/async-storage';

import {User} from '../services/taskratchet/getMe'; // Import the User type

export default async function getStoredUser(): Promise<User | null> {
  const me = await AsyncStorage.getItem('me');
  return me ? (JSON.parse(me) as User) : null; // Cast the parsed object to User
}
