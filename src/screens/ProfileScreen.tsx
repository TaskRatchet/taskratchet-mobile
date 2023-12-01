import {Text, View, StyleSheet, Button, Image} from 'react-native';
import {UserContext} from '../App';
import user from '../utils/currentUser';
import React, {useContext} from 'react';
import useIsDarkMode from '../utils/checkDarkMode';
import themeProvider from '../providers/themeProvider';
import {props} from '../components/types';

export default function ProfileScreen({navigation, route}: props) {
  const backgroundStyle = {
    backgroundColor: useIsDarkMode()
      ? themeProvider.colorsDark.background
      : themeProvider.colorsLight.background,
  };

  const textColorStyle = {
    // this is the text color logic for the login screen
    color: useIsDarkMode() ? 'white' : 'black',
  };

  let dataObj = route.params;
  const {currentUser} = useContext(UserContext);

  function goToLoginScreen() {
    navigation.navigate('LoginScreen');
  }

  return (
    <View style={[backgroundStyle, styles.container]}>
      <View style={styles.nameAndAvatar}>
        <Text style={[textColorStyle, styles.name]}>
          {currentUser !== null ? currentUser.username : 'Guest'}
        </Text>
        <Image source={{uri: user.avatar}} style={styles.avatar} />
      </View>

      <Text style={[textColorStyle, styles.paragraph]}>
        This is the Profile Screen of TaskRatchet
      </Text>
      <Button title="Logout" onPress={goToLoginScreen} />
    </View>
  );
}

const styles = StyleSheet.create({
  nameAndAvatar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    marginLeft: 10,
    borderRadius: 15,
  },
  name: {
    fontSize: 30,
  },
  container: {
    padding: 24,
    flex: 1,
    alignItems: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
