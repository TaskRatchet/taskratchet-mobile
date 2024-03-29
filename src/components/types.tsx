import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';
import {Dispatch, SetStateAction} from 'react';
import {PressableProps, StyleProp, TextStyle} from 'react-native';

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
  id?: string;
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
};

export type infoPopupProps = {
  testID?: string;
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
};

export type stakesInfoPopupProps = {
  testID?: string;
  stakesInfoModalVisible: boolean;
  setStakesInfoModalVisible: Dispatch<SetStateAction<boolean>>;
};

export type WebViewPopupProps = {
  testID?: string;
  webViewModalVisible: boolean;
  setWebViewModalVisible: Dispatch<SetStateAction<boolean>>;
};

export type ButtonLoadingProps = {
  children?: React.ReactNode;
  loading: boolean;
  loadingTextStyle?: StyleProp<TextStyle> | undefined;
} & PressableProps;

export type DatePickerPopupProps = {
  testID?: string;
  dateModalVisible: boolean;
  setDateModalVisible: Dispatch<SetStateAction<boolean>>;
  date: Date;
  onDateChange: Dispatch<SetStateAction<Date>>;
};

export type LoginScreenProps = StackScreenProps<
  RootStackParamList,
  'LoginScreen'
>;

export type TaskType = {
  id: string;
  title: string;
  description: string;
  task: string;
  due: string;
  deadline: string;
  due_timestamp: number;
  cents: number;
  stakes: string;
  complete: boolean;
  status: string;
  timezone: string;
};

export type taskType = TaskType;

export type DeleteAccountPopupProps = {
  navigation?: ProfileScreenNavigationProp;
  modalVisible: boolean;
  setModalVisible: Dispatch<SetStateAction<boolean>>;
};
