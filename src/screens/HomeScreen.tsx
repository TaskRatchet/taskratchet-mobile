import React, {useEffect, useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';

import infoIconBlack from '../../assets/icons/information_icon(black).png';
import infoIconWhite from '../../assets/icons/information_icon(white).png';
import userLogoBlack from '../../assets/icons/user_logo(black).png';
import userLogoWhite from '../../assets/icons/user_logo(white).png';
import logo from '../../assets/images/logo_taskratchet_square_64@2.png';
import InfoPopup from '../components/infoPopup';
import Task from '../components/taskListItem';
import TaskPopup from '../components/taskPopup';
import {Props, TaskType} from '../components/types';
import themeProvider from '../providers/themeProvider';
import {styles} from '../styles/homeScreenStyle';
import useIsDarkMode from '../utils/checkDarkMode';
import checkDate from '../utils/checkDate';
import getStoredTasks from '../utils/getStoredTasks';

export default function HomeScreen({navigation}: Props): JSX.Element {
  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [clickedItem, setClickedItem] = useState('0');
  const [tasks, setCurrentTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    async function getTasksAsync() {
      try {
        const result: TaskType[] = await getStoredTasks();
        setCurrentTasks(result);
      } catch (error) {
        console.error(
          `Error retrieving tasks from storage. Error Log: ${String(error)}`,
        );
      }
    }

    getTasksAsync().catch(error => {
      console.error('error fetching tasks', error);
    });
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
        style={styles.imageStyle}
        blurRadius={10}
        source={logo as ImageSourcePropType}
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
                  ? (userLogoWhite as ImageSourcePropType)
                  : (userLogoBlack as ImageSourcePropType)
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
                  ? (infoIconWhite as ImageSourcePropType)
                  : (infoIconBlack as ImageSourcePropType)
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
                const taskA = tasks[Number(a)];
                const taskB = tasks[Number(b)];

                if ('due' in taskA && 'due' in taskB) {
                  const diffDaysA = checkDate(String(taskA.due));
                  const diffDaysB = checkDate(String(taskB.due));

                  // If the deadline is past, return a large number to sort the task to the bottom
                  const timeLeftA =
                    diffDaysA < 0 ? Number.MAX_SAFE_INTEGER : diffDaysA;
                  const timeLeftB =
                    diffDaysB < 0 ? Number.MAX_SAFE_INTEGER : diffDaysB;

                  return timeLeftA - timeLeftB;
                } else {
                  return 0;
                }
              })
              .map(key => {
                return (
                  <Pressable key={key} onPress={() => taskItemPress(key)}>
                    <Task item={Number(key)} />
                  </Pressable>
                );
              })}
          <View style={styles.spacer /* spacer */} />
        </View>
      </ScrollView>
    </View>
  );
}
