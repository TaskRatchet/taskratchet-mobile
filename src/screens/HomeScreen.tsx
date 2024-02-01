import {useQuery} from '@tanstack/react-query';
import React, {useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';

import helpIconBlack from '../../assets/icons/help_circle(black).png';
import helpIconWhite from '../../assets/icons/help_circle(white).png';
import infoIconBlack from '../../assets/icons/information_icon(black).png';
import infoIconWhite from '../../assets/icons/information_icon(white).png';
import plusCircleBlack from '../../assets/icons/plus(black).png';
import plusCircleWhite from '../../assets/icons/plus(white).png';
import userLogoBlack from '../../assets/icons/user_logo(black).png';
import userLogoWhite from '../../assets/icons/user_logo(white).png';
import logo from '../../assets/images/logo_taskratchet_square_64@2.png';
import InfoPopup from '../components/infoPopup';
import NewTaskPopup from '../components/newTaskPopup';
import Task from '../components/taskListItem';
import TaskPopup from '../components/taskPopup';
import {Props, taskType} from '../components/types';
import themeProvider from '../providers/themeProvider';
import {getTasks} from '../services/taskratchet/getTasks';
import {styles} from '../styles/homeScreenStyle';
import useIsDarkMode from '../utils/checkDarkMode';
import checkDate from '../utils/checkDate';
import {handleHelpButtonPress} from '../utils/handleHelpButtonPress';

export default function HomeScreen({navigation}: Props): JSX.Element {
  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [infoModalVisible, setInfoModalVisible] = useState(false);
  const [newTaskModalVisible, setNewTaskModalVisible] = useState(false);
  const [clickedItem, setClickedItem] = useState<taskType>();

  const {data: tasks} = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  const isDarkMode = useIsDarkMode();

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? themeProvider.colorsDark.background
      : themeProvider.colorsLight.background,
  };

  const plusButtonColor = {
    backgroundColor: isDarkMode
      ? themeProvider.colorsDark.plusButton
      : themeProvider.colorsLight.plusButton,
  };

  const plusButtonColorPressed = {
    backgroundColor: isDarkMode
      ? themeProvider.colorsDark.plusButtonPressed
      : themeProvider.colorsLight.plusButtonPressed,
  };

  const textColorStyle = {
    color: isDarkMode ? 'white' : 'black',
  };

  function handleUserProfilePress() {
    navigation?.navigate('ProfileScreen');
  }

  function handleInfoButtonPress() {
    setInfoModalVisible(!infoModalVisible);
  }

  function taskItemPress(item: taskType) {
    setTaskModalVisible(!taskModalVisible);
    setClickedItem(item);
  }

  function handleNewTaskPress() {
    setNewTaskModalVisible(!newTaskModalVisible);
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
        item={clickedItem}
        modalVisible={taskModalVisible}
        setModalVisible={setTaskModalVisible}
      />
      <NewTaskPopup
        testID="NewTaskPopup"
        modalVisible={newTaskModalVisible}
        setModalVisible={setNewTaskModalVisible}
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
          <View style={styles.infoHelpPair}>
            <Pressable onPress={handleHelpButtonPress}>
              <Image
                style={styles.helpImageStyle}
                source={
                  isDarkMode
                    ? (helpIconWhite as ImageSourcePropType)
                    : (helpIconBlack as ImageSourcePropType)
                }
              />
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
        </View>
        <View style={styles.headerStylesBox}>
          <Text style={[textColorStyle, styles.screenTitle]}>TASK RATCHET</Text>
        </View>
        <View style={styles.taskList}>
          {tasks &&
            tasks
              .sort((a, b) => {
                const taskA = a;
                const taskB = b;

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
              .map(task => {
                return (
                  <Pressable key={task.id} onPress={() => taskItemPress(task)}>
                    <Task item={task} />
                  </Pressable>
                );
              })}
          <View style={styles.spacer /* spacer */} />
        </View>
      </ScrollView>
      <Pressable
        // style={[styles.plusImageBox, plusButtonColor]}
        // style={({pressed}) => [
        //   {
        //     backgroundColor: pressed ? 'rgba(33, 150, 243, 0.5)' : '#2196F3',
        //   },
        //   styles.button,
        // ]}
        style={({pressed}) => [
          styles.plusImageBox,
          {
            backgroundColor: pressed
              ? plusButtonColorPressed.backgroundColor
              : plusButtonColor.backgroundColor,
          },
          styles.button,
        ]}
        onPress={handleNewTaskPress}>
        <Image
          style={styles.plusImage}
          source={
            isDarkMode
              ? (plusCircleWhite as ImageSourcePropType)
              : (plusCircleBlack as ImageSourcePropType)
          }
        />
      </Pressable>
    </View>
  );
}
