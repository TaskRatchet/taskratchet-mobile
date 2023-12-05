import React, {useContext, useState} from 'react';
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
  Modal,
  Alert,
} from 'react-native';

import useIsDarkMode from '../utils/checkDarkMode';
import themeProvider from '../providers/themeProvider';
import NavBar from '../components/navBar';
import user from '../utils/currentUser';
import Task from '../components/taskListItem';
import tasks from '../utils/currentTasks';
import {UserContext} from '../App';
import {props} from '../components/types';
import TaskPopup from '../components/taskPopup';

export default function HomeScreen({navigation}: props): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [clickedItem, setClickedItem] = useState('0');
  const backgroundStyle = {
    backgroundColor: useIsDarkMode()
      ? themeProvider.colorsDark.background
      : themeProvider.colorsLight.background,
  };

  const textColorStyle = {
    // this is the text color logic for the login screen
    color: useIsDarkMode() ? 'white' : 'black',
  };

  function handleUserProfilePress() {
    navigation.navigate('ProfileScreen');
  }

  function taskItemPress(key: string) {
    setModalVisible(!modalVisible);
    setClickedItem(key);
  }

  const {currentUser} = useContext(UserContext);

  return (
    <View style={[backgroundStyle, styles.background]}>
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
      <TaskPopup
        item={clickedItem}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <ScrollView style={styles.scroll} alwaysBounceVertical={true}>
        <View style={styles.userProfile}>
          <Pressable
            style={styles.userProfile}
            onPress={handleUserProfilePress}>
            <Text style={[textColorStyle, styles.name]}>
              {currentUser !== null ? currentUser.username : 'Guest'}
            </Text>
            <Image source={{uri: user.avatar}} style={styles.avatar} />
          </Pressable>
        </View>
        <View style={styles.taskList}>
          {Object.keys(tasks)
            .sort(
              (a, b) =>
                new Date(tasks[a].deadline).getTime() -
                new Date(tasks[b].deadline).getTime(),
            )
            .map(key => {
              return (
                <Pressable key={key} onPress={() => taskItemPress(key)}>
                  <Task item={key} />
                </Pressable>
              );
            })}
          <View style={{height: 100} /* spacer */}></View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scroll: {},
  date: {
    fontSize: 20,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
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
    height: 40,
  },
  userProfile: {
    flexDirection: 'row',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBar: {},
});
