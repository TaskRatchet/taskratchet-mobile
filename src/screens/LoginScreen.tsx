import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';

import logoBordered from '../../assets/images/logo_taskratchet_512_bordered.png';
import logo from '../../assets/images/logo_taskratchet_square_64@2.png';
import {Props} from '../components/types';
import themeProvider from '../providers/themeProvider';
import {getMe} from '../services/taskratchet/getMe';
import {getTasks} from '../services/taskratchet/getTasks';
import {login} from '../services/taskratchet/login';
import {styles} from '../styles/loginScreenStyle';
import useIsDarkMode from '../utils/checkDarkMode';

export default function LoginScreen({navigation}: Props): JSX.Element {
  const isDarkMode = useIsDarkMode();

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? themeProvider.colorsDark.background
      : themeProvider.colorsLight.background,
  };

  const textColorStyle = {
    color: isDarkMode ? 'white' : 'black',
  };

  // these are the default states for the username and password inputs \/
  const [userInput, setUserInput] = React.useState('');
  const [passInput, setPassInput] = React.useState('');
  const [outputStatus, setOutputStatus] = React.useState('');

  async function handleLogin() {
    try {
      const result = await login(userInput, passInput);
      if (result === true) {
        const me = await getMe();
        const tasks = await getTasks();
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
        await AsyncStorage.setItem('me', JSON.stringify(me));
        navigation.navigate('HomeScreen');
      } else {
        setOutputStatus('Login Failed, try again!');
      }
    } catch (error) {
      console.error('login error ' + String(error));
      setOutputStatus('Login Failed, try again!');
    }
  }

  return (
    <View style={[backgroundStyle, styles.screen]}>
      <Image
        style={styles.backgroundImage}
        blurRadius={10}
        source={logo as ImageSourcePropType}
      />
      <SafeAreaView>
        <KeyboardAvoidingView style={styles.container}>
          <Image
            style={styles.logoBordered}
            source={logoBordered as ImageSourcePropType}
          />
          <View style={styles.titleGroup}>
            <Text style={[textColorStyle, styles.title]}>TaskRatchet</Text>
            <Text style={[textColorStyle, styles.title]}>Login</Text>
          </View>

          <View style={styles.credentials}>
            <View style={styles.inputGroup}>
              <Text style={[textColorStyle, styles.inputTitle]}>Username</Text>
              <TextInput
                style={[textColorStyle, styles.inputField]}
                onChangeText={setUserInput}
                placeholder="Username"
                placeholderTextColor={textColorStyle.color}
                keyboardType="default"
                autoComplete="username"
              />
            </View>
            <View style={styles.inputGroup}>
              <Text style={[textColorStyle, styles.inputTitle]}>Password</Text>
              <TextInput
                style={[textColorStyle, styles.inputField]}
                onChangeText={setPassInput}
                placeholder="Password"
                placeholderTextColor={textColorStyle.color}
                keyboardType="default"
                autoComplete="current-password"
                secureTextEntry={true}
              />
            </View>
          </View>
          <Pressable
            testID="loginButton"
            style={styles.login}
            onPress={() => {
              handleLogin().catch(error => {
                console.error('login error ' + String(error));
              });
            }}>
            <Text style={styles.loginText}>Login</Text>
          </Pressable>
          <Text style={[textColorStyle, styles.text]}>{outputStatus}</Text>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
