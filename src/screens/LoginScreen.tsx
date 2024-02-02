import {useMutation} from '@tanstack/react-query';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Linking,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';

import helpIconBlack from '../../assets/icons/help_circle(black).png';
import helpIconWhite from '../../assets/icons/help_circle(white).png';
import logoBordered from '../../assets/images/logo_taskratchet_512_bordered.png';
import logo from '../../assets/images/logo_taskratchet_square_64@2.png';
import PressableLoading from '../components/pressableLoading';
import {Props} from '../components/types';
import themeProvider from '../providers/themeProvider';
import {login} from '../services/taskratchet/login';
import {styles} from '../styles/loginScreenStyle';
import useIsDarkMode from '../utils/checkDarkMode';
import {handleHelpButtonPress} from '../utils/handleHelpButtonPress';

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
        <Pressable style={styles.topButtonBox} onPress={handleHelpButtonPress}>
          <Image
            style={styles.helpImageStyle}
            source={
              isDarkMode
                ? (helpIconWhite as ImageSourcePropType)
                : (helpIconBlack as ImageSourcePropType)
            }
          />
        </Pressable>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'android' ? -200 : 0}>
          <View style={styles.containerInner}>
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
                <Text style={[textColorStyle, styles.inputTitle]}>
                  Username
                </Text>
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
                <Text style={[textColorStyle, styles.inputTitle]}>
                  Password
                </Text>
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
            <PressableLoading
              testID="loginButton"
              loading={mutation.isPending}
              loadingTextStyle={styles.loginText}
              style={styles.login}
              onPress={() => {
                mutation.mutate();
              }}>
              <Text style={styles.loginText}>Login</Text>
            </PressableLoading>
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
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
