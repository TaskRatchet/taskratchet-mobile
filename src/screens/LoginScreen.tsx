//dependency imports
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
import useIsDarkMode from '../utils/checkDarkMode';
import themeProvider from '../providers/themeProvider';
import {UserContext} from '../App';
import {props} from '../components/types';
import {login} from '../services/taskratchet/login';
import {styles} from '../styles/loginScreenStyle';

export default function LoginScreen({navigation, route}: props): JSX.Element {
  const backgroundStyle = {
    backgroundColor: useIsDarkMode()
      ? themeProvider.colorsDark.background
      : themeProvider.colorsLight.background,
  };

  const textColorStyle = {
    color: useIsDarkMode() ? 'white' : 'black',
  };

  // these are the default states for the username and password inputs \/
  const [userInput, setUserInput] = React.useState('');
  const [passInput, setPassInput] = React.useState('');
  const [outputStatus, setOutputStatus] = React.useState('');

  const {setCurrentUser} = React.useContext(UserContext);

  return (
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
                placeholderTextColor={useIsDarkMode() ? 'white' : 'black'}
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
                placeholderTextColor={useIsDarkMode() ? 'white' : 'black'}
                keyboardType="default"
                autoComplete="current-password"
                secureTextEntry={true}
              />
            </View>
          </View>
          <Pressable
            style={styles.login}
            onPress={async () => {
              try {
                const result = await login(userInput, passInput);
                if (result === true) {
                  navigation.navigate('HomeScreen');
                  const me = await getMe();
                  const tasks = await getTasks();
                  await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
                  await AsyncStorage.setItem('me', JSON.stringify(me));
                } else {
                  setOutputStatus('Login Failed, try again!');
                }
              } catch (error) {
                console.log('login error ' + error);
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
