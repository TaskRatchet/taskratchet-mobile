import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {Button, Image, ImageSourcePropType, Text, View} from 'react-native';

import logo from '../../assets/images/logo_taskratchet_square_64@2.png';
import {Props} from '../components/types';
import themeProvider from '../providers/themeProvider';
import {getMe} from '../services/taskratchet/getMe';
import {styles} from '../styles/profileScreenStyle';
import useIsDarkMode from '../utils/checkDarkMode';

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

  const {data: user} = useQuery({queryKey: ['user'], queryFn: getMe});

  const dataBorderColor = {borderColor: isDarkMode ? 'white' : 'black'};

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
        {user ? (
          <>
            <View>
              <View style={[dataBorderColor, styles.dataPair]}>
                <Text style={[textColorStyle, styles.dataText]}>Name:</Text>
                <Text
                  style={[textColorStyle, styles.dataValueText]}
                  numberOfLines={1}>
                  {user.name}
                </Text>
              </View>
            </View>
            <View>
              <View style={[dataBorderColor, styles.dataPair]}>
                <Text style={[textColorStyle, styles.dataText]}>Email:</Text>
                <Text
                  style={[textColorStyle, styles.dataValueText]}
                  numberOfLines={1}>
                  {user.email}
                </Text>
              </View>
            </View>
            <View>
              <View style={[dataBorderColor, styles.dataPair]}>
                <Text style={[textColorStyle, styles.dataText]}>Timezone:</Text>
                <Text
                  style={[textColorStyle, styles.dataValueText]}
                  numberOfLines={1}>
                  {user.timezone}
                </Text>
              </View>
            </View>
          </>
        ) : (
          <Text>Loading...</Text>
        )}
        <Button title="Logout" onPress={goToLoginScreen} />
      </View>
    </View>
  );
}
