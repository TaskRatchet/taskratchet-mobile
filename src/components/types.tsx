import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {Dispatch, SetStateAction} from 'react';

export type taskType = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  deadline: string;
  stakes: string;
};

export type tasksType = {
  [key: string]: taskType;
};

export type userType = {
  username: string;
  password?: string;
  email: string;
  phone: string;
};

type RootStackParamList = {
  LoginScreen: undefined;
  HomeScreen: undefined;
  ProfileScreen: undefined;
};

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ProfileScreen'
>;

type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'ProfileScreen'>;

export type Props = {
  navigation?: ProfileScreenNavigationProp;
  route?: ProfileScreenRouteProp;
};

export type TaskPopupProps = {
  testID?: string;
  item: number;
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
};

export type infoPopupProps = {
  testID?: string;
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
};

export type LoginScreenProps = StackScreenProps<
  RootStackParamList,
  'LoginScreen'
>;

export type TaskType = {
  id: string;
  task: string;
  due: string;
  due_timestamp: number;
  cents: number;
  complete: boolean;
  status: string;
  timezone: string;
};
