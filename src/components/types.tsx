import {type} from 'os';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';

// types.ts
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

export type props = {
  navigation: ProfileScreenNavigationProp;
  route: ProfileScreenRouteProp;
};
