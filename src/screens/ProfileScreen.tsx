import {Text, View, StyleSheet, Button, Image} from 'react-native';
import {UserContext} from '../App';
import user from '../utils/currentUser';
import React, {useContext, useState, useEffect} from 'react';
import useIsDarkMode from '../utils/checkDarkMode';
import themeProvider from '../providers/themeProvider';
import {props} from '../components/types';

//api imports
import {User} from '../services/taskratchet/getMe';
import fetch1 from '../services/taskratchet/fetch1';

//local imports
import getStoredUser from '../utils/currentUser';

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

  const [user, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    async function getUser() {
      const result: User = await getStoredUser();
      if (result === null) {
        throw new Error('Unable to get user info');
      }
      setCurrentUser(result);
    }

    getUser();
  }, []);

  function goToLoginScreen() {
    navigation.navigate('LoginScreen');
  }

  console.log(fetch1('me/tasks', true));

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
        <Text style={[textColorStyle, styles.name]}>Profile</Text>
      </View>
      <View style={styles.dataGroup}>
        <View>
          <View style={styles.dataPair}>
            <Text style={[textColorStyle, styles.dataText]}>Name:</Text>
            <Text
              style={[textColorStyle, styles.dataValueText]}
              numberOfLines={1}>
              {user !== null ? user.name : '...'}
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.dataPair}>
            <Text style={[textColorStyle, styles.dataText]}>Email:</Text>
            <Text
              style={[textColorStyle, styles.dataValueText]}
              numberOfLines={1}>
              {user !== null ? user.email : '...'}
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.dataPair}>
            <Text style={[textColorStyle, styles.dataText]}>Timezone:</Text>
            <Text
              style={[textColorStyle, styles.dataValueText]}
              numberOfLines={1}>
              {user !== null ? user.timezone : '...'}
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
