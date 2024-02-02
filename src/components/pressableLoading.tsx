import React from 'react';
import {Pressable, Text} from 'react-native';

import {ButtonLoadingProps} from './types';

export default function PressableLoading(props: ButtonLoadingProps) {
  return (
    <Pressable disabled={props.loading} {...props}>
      {props.loading ? (
        <Text style={props.loadingTextStyle}>Loading...</Text>
      ) : (
        props.children
      )}
    </Pressable>
  );
}
