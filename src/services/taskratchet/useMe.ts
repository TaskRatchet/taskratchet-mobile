import {useQuery} from '@tanstack/react-query';

import {getMe} from './getMe';

export default function useMe() {
  return useQuery({queryKey: ['user'], queryFn: getMe});
}
