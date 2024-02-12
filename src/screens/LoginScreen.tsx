import {useMutation, useQueryClient} from '@tanstack/react-query';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  KeyboardAvoidingView,
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
import WebViewPopup from '../components/webViewPopup';
import themeProvider from '../providers/themeProvider';
import * as login from '../services/taskratchet/login';
import {styles} from '../styles/loginScreenStyle';
import useIsDarkMode from '../utils/checkDarkMode';
import {handleHelpButtonPress} from '../utils/handleHelpButtonPress';

export default function LoginScreen(): JSX.Element {
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
  const [WebViewModalVisible, setWebViewModalVisible] = React.useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => login.login(userInput, passInput),
    onSettled: async (data, error) => {
      if (!data || error) {
        console.log('login error ' + String(error));
        setOutputStatus('Login Failed, try again!');
        return;
      }

      await queryClient.invalidateQueries({queryKey: ['user']});
      setUserInput('');
      setPassInput('');
    },
  });

  function handleRegisterButtonPress() {
    setWebViewModalVisible(!WebViewModalVisible);
  }

  return (
    <View style={[backgroundStyle, styles.screen]}>
      <Image
        style={styles.backgroundImage}
        blurRadius={10}
        source={logo as ImageSourcePropType}
      />
      <SafeAreaView>
        <WebViewPopup
          webViewModalVisible={WebViewModalVisible}
          setWebViewModalVisible={setWebViewModalVisible}
        />

        <Pressable onPress={handleHelpButtonPress}>
          <View style={styles.helpButtonBox}>
            <Image
              style={styles.helpImageStyle}
              source={
                isDarkMode
                  ? (helpIconWhite as ImageSourcePropType)
                  : (helpIconBlack as ImageSourcePropType)
              }
            />
          </View>
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
                  value={userInput}
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
                  value={passInput}
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
                if (userInput === '' || passInput === '') {
                  setOutputStatus('Username and Password Required');
                  return;
                }
                mutation.mutate();
              }}>
              <Text style={styles.loginText}>Login</Text>
            </PressableLoading>
            <Pressable
              testID="registerButton"
              style={styles.register}
              onPress={handleRegisterButtonPress}>
              <Text style={styles.registerText}>Register</Text>
            </Pressable>
            <Text style={[textColorStyle, styles.text]}>{outputStatus}</Text>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
