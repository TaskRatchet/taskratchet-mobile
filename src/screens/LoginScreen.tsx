//dependencie imports
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

//api imports
import {getMe} from '../services/taskratchet/getMe';
import {getTasks} from '../services/taskratchet/getTasks';

//local imports
import checkCredentials from '../utils/checkCredentials';
import useIsDarkMode from '../utils/checkDarkMode';
import themeProvider from '../providers/themeProvider';
import {UserContext} from '../App';
import {Props} from '../components/types';
import {login} from '../services/taskratchet/login';
import {get} from 'http';

export default function LoginScreen({navigation, route}: Props): JSX.Element {
  const isDarkMode = useIsDarkMode();

  const backgroundStyle = {
    // this is the background color of the login screen
    backgroundColor: isDarkMode
      ? themeProvider.colorsDark.background
      : themeProvider.colorsLight.background,
  };

  const textColorStyle = {
    // this is the text color logic for the login screen
    color: isDarkMode ? 'white' : 'black',
  };

  // these are the default states for the username and password inputs \/
  const [userInput, setUserInput] = React.useState('');
  const [passInput, setPassInput] = React.useState('');
  const [outputStatus, setOutputStatus] = React.useState('');

  const {setCurrentUser} = React.useContext(UserContext);

  return (
    // this is the background \/
    <View style={[backgroundStyle, styles.screen]}>
      <Image
        style={{
          width: '140%',
          height: '80%',
          opacity: 0.5,
          position: 'absolute',
          top: '-30%',
          left: '-40%',
        }}
        blurRadius={10}
        source={require('../../assets/images/logo_taskratchet_square_64@2.png')}
      />
      <SafeAreaView>
        <KeyboardAvoidingView style={styles.container}>
          <Image
            style={{width: 60, height: 60}}
            source={require('../../assets/images/logo_taskratchet_512_bordered.png')}
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
            onPress={async () => {
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
                console.error('login error ' + error);
                setOutputStatus('Login Failed, try again!');
              }
            }}>
            <Text style={styles.loginText}>Login</Text>
          </Pressable>
          <Text style={[textColorStyle, styles.text]}>{outputStatus}</Text>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  loginText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2A5364',
    textAlign: 'center',
  },
  login: {
    width: 300,
    marginTop: 15,
    marginBottom: 15,
    padding: 5,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#AAD9EB',
  },
  screen: {
    height: '100%',
  },
  container: {
    marginTop: '30%',
    padding: 24,
    fontSize: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  credentials: {
    alignItems: 'flex-end',
  },
  inputTitle: {
    textAlign: 'right',
    marginLeft: 10,
    margin: 20,
    fontSize: 18,
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'row',
  },
  inputField: {
    backgroundColor: 'grey',
    opacity: 0.5,
    width: '50%',
    margin: 12,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: 5,
    fontWeight: 'normal',
  },
  titleGroup: {
    fontSize: 50,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 15,
  },
  text: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
});
