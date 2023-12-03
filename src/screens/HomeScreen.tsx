import React, {useContext} from 'react';
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
  ScrollView,
} from 'react-native';

import useIsDarkMode from '../utils/checkDarkMode';
import themeProvider from '../providers/themeProvider';
import NavBar from '../components/navBar';
import user from '../utils/currentUser';
import Task from '../components/task';
import tasks from '../utils/currentTasks';
import {UserContext} from '../App';
import {props} from '../components/types';

export default function HomeScreen({navigation}: props): JSX.Element {
  const backgroundStyle = {
    backgroundColor: useIsDarkMode()
      ? themeProvider.colorsDark.background
      : themeProvider.colorsLight.background,
  };

  function handleUserProfilePress() {
    navigation.navigate('ProfileScreen');
  }

  const {currentUser} = useContext(UserContext);

  return (
    <View style={[backgroundStyle, styles.background]}>
      <ScrollView>
        <View style={styles.userProfile}>
          <Pressable
            style={styles.userProfile}
            onPress={handleUserProfilePress}>
            <Text style={styles.name}>
              {currentUser !== null ? currentUser.username : 'Guest'}
            </Text>
            <Image source={{uri: user.avatar}} style={styles.avatar} />
          </Pressable>
        </View>
        <View style={styles.taskList}>
          {Object.keys(tasks).map(key => {
            return <Task key={key} item={key} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  taskList: {},
  avatar: {
    width: 50,
    height: 50,
    marginLeft: 10,
    borderRadius: 15,
  },
  name: {
    fontSize: 30,
  },
  userProfile: {
    flexDirection: 'row',
    height: '15%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBar: {},
});
