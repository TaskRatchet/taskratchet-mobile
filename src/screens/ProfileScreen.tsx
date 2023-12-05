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
      <View style={styles.nameAndAvatar}>
        <Text style={[textColorStyle, styles.name]}>
          {currentUser !== null ? currentUser.username : 'Guest'}
        </Text>
        <Image source={{uri: user.avatar}} style={styles.avatar} />
      </View>
      <View style={styles.dataGroup}>
        <View>
          <View style={styles.dataPair}>
            <Text style={[textColorStyle, styles.dataText]}>Name:</Text>
            <Text style={[textColorStyle, styles.dataValueText]}>
              {currentUser !== null ? currentUser.username : 'Guest'}
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.dataPair}>
            <Text style={[textColorStyle, styles.dataText]}>Email:</Text>
            <Text style={[textColorStyle, styles.dataValueText]}>
              {currentUser !== null ? currentUser.email : 'Guest'}
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.dataPair}>
            <Text style={[textColorStyle, styles.dataText]}>Phone:</Text>
            <Text style={[textColorStyle, styles.dataValueText]}>
              {currentUser !== null ? currentUser.phone : 'Guest'}
            </Text>
          </View>
        </View>
        <Button title="Logout" onPress={goToLoginScreen} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dataValueText: {
    fontSize: 18,
  },
  dataText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  dataGroup: {
    marginTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataPair: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    width: 300,
    padding: 8,
    margin: 8,
  },
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
