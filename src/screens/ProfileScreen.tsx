import React, {useEffect, useState} from 'react';
import {Button, Image, ImageSourcePropType, Text, View} from 'react-native';

import logo from '../../assets/images/logo_taskratchet_square_64@2.png';
import {Props} from '../components/types';
import themeProvider from '../providers/themeProvider';
import {User} from '../services/taskratchet/getMe';
import {styles} from '../styles/profileScreenStyle';
import useIsDarkMode from '../utils/checkDarkMode';
import getStoredUser from '../utils/getStoredUser';

export default function ProfileScreen({navigation}: Props) {
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
      try {
        const result: User | null = await getStoredUser();
        if (result === null) {
          throw new Error('Unable to get user info');
        }
        setCurrentUser(result);
      } catch (error) {
        console.error('getUser error ' + String(error));
      }
    }

    // eslint-disable-next-line no-void
    void getUser();
  }, []);

  function goToLoginScreen() {
    navigation?.navigate('LoginScreen');
  }

  return (
    <View style={[backgroundStyle, styles.container]}>
      <Image
        style={styles.backgroundImage}
        blurRadius={10}
        source={logo as ImageSourcePropType}
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
