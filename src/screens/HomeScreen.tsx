import React, {useState, useEffect} from 'react';
import {Text, View, Image, Pressable, ScrollView} from 'react-native';

//api imports
import {User} from '../services/taskratchet/getMe';

//local imports
import useIsDarkMode from '../utils/checkDarkMode';
import themeProvider from '../providers/themeProvider';
import NavBar from '../components/navBar';
import Task from '../components/taskListItem';
import {TaskType} from '../components/types';
import TaskPopup from '../components/taskPopup';
import InfoPopup from '../components/infoPopup';
import getStoredUser from '../utils/getStoredUser';
import getStoredTasks from '../utils/getStoredTasks';
import checkDate from '../utils/checkDate';
import {styles} from '../styles/homeScreenStyle';

export default function HomeScreen({navigation}: Props): JSX.Element {
  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [clickedItem, setClickedItem] = useState('0');
  const [user, setCurrentUser] = useState<User | null>(null);
  const [tasks, setCurrentTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function getUser() {
      try {
        const result: User = await getStoredUser();
        setCurrentUser(result);
      } catch (error) {
        console.error(
          `Error retrieving user from storage. Error Log: ${error}`,
        );
      }
    }

    getUser();

    async function getTasksAsync() {
      try {
        const result = await getStoredTasks();
        setCurrentTasks(result);
      } catch (error) {
        console.error(
          `Error retrieving tasks from storage. Error Log: ${error}`,
        );
      }
    }

    getTasksAsync();
  }, []);

  const isDarkMode = useIsDarkMode();

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? themeProvider.colorsDark.background
      : themeProvider.colorsLight.background,
  };

  const textColorStyle = {
    color: isDarkMode ? 'white' : 'black',
  };

  function handleUserProfilePress() {
    navigation.navigate('ProfileScreen');
  }

  function handleInfoButtonPress() {
    setInfoModalVisible(!infoModalVisible);
  }

  function taskItemPress(key: string) {
    setTaskModalVisible(!taskModalVisible);
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
      <InfoPopup
        testID="infoPopup"
        modalVisible={infoModalVisible}
        setModalVisible={setInfoModalVisible}
      />
      <TaskPopup
        testID="taskPopup"
        item={Number(clickedItem)}
        modalVisible={taskModalVisible}
        setModalVisible={setTaskModalVisible}
      />
      <ScrollView style={styles.scroll} alwaysBounceVertical={true}>
        <View style={styles.profile_infoButtons}>
          <Pressable
            style={styles.profile_infoButtons}
            onPress={handleUserProfilePress}>
            <Image
              style={styles.profileImage}
              source={
                isDarkMode
                  ? require('../../assets/icons/user_logo(white).png')
                  : require('../../assets/icons/user_logo(black).png')
              }
            />
            <Text style={[textColorStyle, styles.userProfile]}>
              User Profile
            </Text>
          </Pressable>
          <Pressable onPress={handleInfoButtonPress}>
            <Image
              style={styles.infoImageStyle}
              source={
                isDarkMode
                  ? require('../../assets/icons/information_icon(white).png')
                  : require('../../assets/icons/information_icon(black).png')
              }
            />
          </Pressable>
        </View>
        <View style={styles.headerStylesBox}>
          <Text style={[textColorStyle, styles.screenTitle]}>TASK RATCHET</Text>
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
