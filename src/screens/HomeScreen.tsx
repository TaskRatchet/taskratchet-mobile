import React, {useState, useEffect} from 'react';
import {Text, View, Image, Pressable, ScrollView} from 'react-native';

//api imports
import {User} from '../services/taskratchet/getMe';

//local imports
import useIsDarkMode from '../utils/checkDarkMode';
import themeProvider from '../providers/themeProvider';
import NavBar from '../components/navBar';
import Task from '../components/taskListItem';
import {props, task} from '../components/types';
import TaskPopup from '../components/taskPopup';
import getStoredUser from '../utils/getStoredUser';
import getStoredTasks from '../utils/getStoredTasks';
import checkDate from '../utils/checkDate';
import {styles} from '../styles/homeScreenStyle';

export default function HomeScreen({navigation}: props): JSX.Element {
  const [modalVisible, setModalVisible] = useState(false);
  const [clickedItem, setClickedItem] = useState('0');
  const [user, setCurrentUser] = useState<User | null>(null);
  const [tasks, setCurrentTasks] = useState<task[]>([]);

  useEffect(() => {
    async function getUser() {
      const result: User = await getStoredUser();
      setCurrentUser(result);
    }

    getUser();

    async function getTasksAsync() {
      const result = await getStoredTasks();
      setCurrentTasks(result);
    }

    getTasksAsync();
  }, []);

  const backgroundStyle = {
    backgroundColor: useIsDarkMode()
      ? themeProvider.colorsDark.background
      : themeProvider.colorsLight.background,
  };

  const textColorStyle = {
    color: useIsDarkMode() ? 'white' : 'black',
  };

  function handleUserProfilePress() {
    navigation.navigate('ProfileScreen');
  }

  function taskItemPress(key: string) {
    setModalVisible(!modalVisible);
    setClickedItem(key);
  }

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
        testID="taskPopup"
        item={Number(clickedItem)}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
      <ScrollView style={styles.scroll} alwaysBounceVertical={true}>
        <View style={styles.userProfile}>
          <Pressable
            style={styles.userProfile}
            onPress={handleUserProfilePress}>
            <Text style={[textColorStyle, styles.name]}>
              {user !== null ? user.name : '...'}
            </Text>
          </Pressable>
        </View>
        <View style={styles.taskList}>
          {tasks &&
            Object.keys(tasks)
              .sort((a, b) => {
                const diffDaysA = checkDate(tasks[a].due);
                const diffDaysB = checkDate(tasks[b].due);

                // If the deadline is past, return a large number to sort the task to the bottom
                const timeLeftA =
                  diffDaysA < 0 ? Number.MAX_SAFE_INTEGER : diffDaysA;
                const timeLeftB =
                  diffDaysB < 0 ? Number.MAX_SAFE_INTEGER : diffDaysB;

                return timeLeftA - timeLeftB;
              })
              .map(key => {
                return (
                  <Pressable key={key} onPress={() => taskItemPress(key)}>
                    <Task item={Number(key)} />
                  </Pressable>
                );
              })}
          <View style={{height: 100} /* spacer */}></View>
        </View>
      </ScrollView>
    </View>
  );
}
