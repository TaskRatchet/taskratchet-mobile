import {useColorScheme} from 'react-native';

export default function useIsDarkMode(): boolean {
  return useColorScheme() === 'dark';
}
