import {useColorScheme} from 'react-native';

export default function isLightMode(): boolean {
  return useColorScheme() === 'dark';
}
