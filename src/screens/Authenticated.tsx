import React from 'react';
import {Text} from 'react-native';

import useMe from '../services/taskratchet/useMe';
import LoginScreen from './LoginScreen';

export default function Authenticated({children}: {children: React.ReactNode}) {
  const {data, isError} = useMe();

  console.log('me:', data);

  // if (me.isPending) {
  //   return <Text style={{color: 'black'}}>Loading...</Text>;
  // }

  if (!data || isError) {
    return <LoginScreen />;
  }

  return children;
}
