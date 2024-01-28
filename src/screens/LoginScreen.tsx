import {useMutation} from '@tanstack/react-query';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Linking,
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

  const mutation = useMutation({
    mutationFn: () => login(userInput, passInput),
    onSettled: (data, error) => {
      if (!data || error) {
        console.error('login error ' + String(error));
        setOutputStatus('Login Failed, try again!');
        return;
      }
      navigation?.navigate('HomeScreen');
    },
  });

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
              mutation.mutate();
            }}>
            <Text style={styles.loginText}>Login</Text>
          </Pressable>
          <Pressable
            testID="registerButton"
            style={styles.register}
            onPress={() => {
              Linking.openURL('https://app.taskratchet.com/register').catch(
                err => console.error('An error occurred', err),
              );
            }}>
            <Text style={styles.registerText}>Register</Text>
          </Pressable>
          <Text style={[textColorStyle, styles.text]}>{outputStatus}</Text>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
