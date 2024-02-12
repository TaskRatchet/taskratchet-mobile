import React from 'react';

import useMe from '../services/taskratchet/useMe';
import LoginScreen from './LoginScreen';

export default function Authenticated({children}: {children: React.ReactNode}) {
  const {data, isError} = useMe();

  if (!data || isError) {
    return <LoginScreen />;
  }

  return children;
}
