import {Text, View, Button, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import useIsDarkMode from '../utils/checkDarkMode';
import themeProvider from '../providers/themeProvider';
import {Props} from '../components/types';

//api imports
import {User} from '../services/taskratchet/getMe';
import fetch1 from '../services/taskratchet/fetch1';

//local imports
import getStoredUser from '../utils/getStoredUser';
import {styles} from '../styles/profileScreenStyle';

export default function ProfileScreen({navigation, route}: Props) {
  const isDarkMode = useIsDarkMode();
  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? themeProvider.colorsDark.background
      : themeProvider.colorsLight.background,
  };

  const textColorStyle = {
    color: isDarkMode ? 'white' : 'black',
  };

  const [user, setCurrentUser] = useState<User | null>(null);

  const dataBorderColor = {borderColor: isDarkMode ? 'white' : 'black'};

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
          <View style={[dataBorderColor, styles.dataPair]}>
            <Text style={[textColorStyle, styles.dataText]}>Name:</Text>
            <Text
              style={[textColorStyle, styles.dataValueText]}
              numberOfLines={1}>
              {user !== null ? user.name : '...'}
            </Text>
          </View>
        </View>
        <View>
          <View style={[dataBorderColor, styles.dataPair]}>
            <Text style={[textColorStyle, styles.dataText]}>Email:</Text>
            <Text
              style={[textColorStyle, styles.dataValueText]}
              numberOfLines={1}>
              {user !== null ? user.email : '...'}
            </Text>
          </View>
        </View>
        <View>
          <View style={[dataBorderColor, styles.dataPair]}>
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
