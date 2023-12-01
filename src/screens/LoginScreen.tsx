//dependencie imports
import React, {useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Button,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

//local imports
import checkCredentials from '../utils/checkCredentials';
import useIsDarkMode from '../utils/checkDarkMode';
import themeProvider from '../components/providers/themeProvider';

export default function LoginScreen({navigation}): JSX.Element {
  const backgroundStyle = {
    // this is the background color of the login screen
    backgroundColor: useIsDarkMode()
      ? themeProvider.colorsDark.background
      : themeProvider.colorsLight.background,
  };

  const textColorStyle = {
    // this is the text color logic for the login screen
    color: useIsDarkMode() ? 'white' : 'black',
  };

  // these are the default states for the username and password inputs \/
  const [userInput, setUserInput] = React.useState('');
  const [passInput, setPassInput] = React.useState('');
  const [outputStatus, setOutputStatus] = React.useState('');

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
      <SafeAreaView style={styles.container}>
        <Image
          style={{width: 60, height: 60}}
          source={require('../../assets/images/logo_taskratchet_512_bordered.png')}
        />
        <View style={styles.titleGroup}>
          <Text style={[textColorStyle, styles.title]}>Taskratchet</Text>
          <Text style={[textColorStyle, styles.title]}>Login</Text>
        </View>

        <View style={styles.credentials}>
          <View style={styles.inputGroup}>
            <Text style={[textColorStyle, styles.inputTitle]}>Username</Text>
            <TextInput
              style={[textColorStyle, styles.inputField]}
              onChangeText={setUserInput}
              // value={number}
              placeholder="Username"
              placeholderTextColor={useIsDarkMode() ? 'white' : 'black'}
              keyboardType="default"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={[textColorStyle, styles.inputTitle]}>Password</Text>
            <TextInput
              style={[textColorStyle, styles.inputField]}
              onChangeText={setPassInput}
              // value={number}
              placeholder="Password"
              placeholderTextColor={useIsDarkMode() ? 'white' : 'black'}
              keyboardType="default"
            />
          </View>
        </View>
        <Pressable
          style={styles.login}
          onPress={() => {
            console.log('Username', userInput);
            console.log('Password', passInput);
            checkCredentials(userInput, passInput)
              ? navigation.navigate('HomeScreen')
              : setOutputStatus('Login Failed, try again!');
          }}>
          <Text style={styles.loginText}>Login</Text>
        </Pressable>
        <Text style={[textColorStyle, styles.text]}>{outputStatus}</Text>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  loginText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2A5364', //'#0000EE',
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
    marginTop: '50%',
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
