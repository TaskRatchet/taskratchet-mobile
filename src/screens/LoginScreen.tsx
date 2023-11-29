import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text} from 'react-native';
import useIsDarkMode from '../utils/CheckDarkmode';
import {Colors} from 'react-native/Libraries/NewAppScreen';

export default function LoginScreen(): JSX.Element {
  const backgroundStyle = {
    backgroundColor: useIsDarkMode() ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <StatusBar
        barStyle={useIsDarkMode() ? 'light-content' : 'dark-content'}
      />
      <Text style={styles.title}>Login</Text>
      <Text style={styles.text}>Username</Text>
      <Text style={styles.text}>Password</Text>
      <Text style={styles.text}>Forgot Password?</Text>
      <Text style={styles.text}>Login</Text>
      <Text style={styles.text}>Sign Up</Text>
      <Text style={styles.text}>Sign Up with Google</Text>
      <Text style={styles.text}>Sign Up with Facebook</Text>
      <Text style={styles.text}>Sign Up with Apple</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  text: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
});
