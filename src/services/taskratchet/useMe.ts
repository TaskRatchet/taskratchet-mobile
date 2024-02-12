import {useQuery} from '@tanstack/react-query';

import {getMe} from './getMe';

export default function useMe() {
  console.log('useMe running...');
  return useQuery({queryKey: ['user'], queryFn: getMe});
}
