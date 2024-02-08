import {useQuery} from '@tanstack/react-query';
import React, {useState} from 'react';
import {Image, ImageSourcePropType, Pressable, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import logo from '../../assets/images/logo_taskratchet_square_64@2.png';
import DeleteAccountPopup from '../components/deleteAccountPopup';
import {Props} from '../components/types';
import themeProvider from '../providers/themeProvider';
import {getMe} from '../services/taskratchet/getMe';
import {styles} from '../styles/profileScreenStyle';
import useIsDarkMode from '../utils/checkDarkMode';

export default function ProfileScreen({navigation}: Props) {
  const [modalVisible, setModalVisible] = useState(false);

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
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <Image
        style={styles.backgroundImage}
        blurRadius={10}
        source={logo as ImageSourcePropType}
      />

      <DeleteAccountPopup
        navigation={navigation}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />

      <View style={styles.profileTitle}>
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
        <View style={styles.buttons}>
          <Pressable onPress={() => navigation?.navigate('HomeScreen')}>
            {({pressed}) => (
              <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={[styles.button, {color: pressed ? 'blue' : '#0178FA'}]}>
                Go to Home
              </Text>
            )}
          </Pressable>
          <Pressable onPress={goToLoginScreen}>
            {({pressed}) => (
              <Text
                // eslint-disable-next-line react-native/no-inline-styles
                style={[styles.button, {color: pressed ? 'blue' : '#0178FA'}]}>
                Logout
              </Text>
            )}
          </Pressable>
          <Pressable
            onPress={() => setModalVisible(true)}
            style={({pressed}) => [
              {
                backgroundColor: pressed ? 'rgba(255, 0, 0, 0.5)' : 'red',
              },
              styles.deleteAccountButton,
            ]}>
            <Text style={[textColorStyle, styles.deleteAccount]}>
              Delete Account
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
