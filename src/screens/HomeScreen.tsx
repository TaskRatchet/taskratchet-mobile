//dependencie imports
import React from 'react';
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
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useState} from 'react';

//local imports
import useIsDarkMode from '../utils/checkDarkMode';
import themeProvider from '../components/providers/themeProvider';
import NavBar from '../components/navBar';
import user from '../utils/currentUser';
import Task from '../components/task';
import tasks from '../utils/currentTasks';

export default function HomeScreen(): JSX.Element {
  const backgroundStyle = {
    backgroundColor: useIsDarkMode()
      ? themeProvider.colorsDark.background
      : themeProvider.colorsLight.background,
  };

  return (
    <View style={[backgroundStyle, styles.background]}>
      <ScrollView style={styles.scroll}>
        <View style={styles.userProfile}>
          <Pressable
            style={styles.userProfile}
            onPress={() => {
              console.log('user profile pressed');
            }}>
            <Text style={styles.name}>{user.name}</Text>
            <Image source={{uri: user.avatar}} style={styles.avatar} />
          </Pressable>
        </View>
        <View style={styles.taskList}>
          {Object.keys(tasks).map(key => {
            console.log(key);
            return <Task key={key} item={Number(key)} />;
          })}
        </View>
      </ScrollView>

      <View style={styles.scroll}></View>
      <View style={styles.navBar}>
        <NavBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
  scroll: {
    flex: 0,
  },
  navBar: {},
  background: {
    height: '100%',
  },
});
