//react imports
import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

//local imports
import themeProvider from '../providers/themeProvider';
import tasks from '../utils/currentTasks';
import {taskType, tasksType} from './types';
import checkDate from '../utils/checkDate';
import useIsDarkMode from '../utils/checkDarkMode';

const tasksArray = Object.values(tasks) as Task[];

export default function Task({item}: {item: string}): JSX.Element {
  const {title, deadline, stakes} = tasksArray[Number(item)];
  const primaryStyle = {
    backgroundColor: useIsDarkMode()
      ? themeProvider.colorsDark.primary
      : themeProvider.colorsLight.primary,
  };

  const textColorStyle = {
    color: useIsDarkMode() ? 'white' : 'black',
  };

  return (
    <View style={[primaryStyle, styles.taskBlock]}>
      <View>
        <Text style={[textColorStyle, styles.taskTitle]}>{title}</Text>
        <Text
          style={[
            checkDate(deadline) < 0 ? styles.textRed : styles.taskDeadline,
            checkDate(deadline) === 0 ? styles.textYellow : styles.taskDeadline,
            checkDate(deadline) === 1 ? styles.textYellow : styles.taskDeadline,
            checkDate(deadline) > 1 ? styles.textGreen : styles.taskDeadline,
          ]}>
          {checkDate(deadline) < 0
            ? 'Overdue'
            : [
                checkDate(deadline) === 0
                  ? 'Due Today'
                  : [
                      checkDate(deadline) === 1
                        ? 'Due Tomorrow'
                        : 'Due in ' + checkDate(deadline) + ' days',
                    ],
              ]}
        </Text>
      </View>

      <View style={styles.taskSideRight}>
        <Text style={[textColorStyle, styles.taskStakes]}>{stakes}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textRed: {
    color: '#D03131',
  },
  textYellow: {
    color: '#9DA41D',
  },
  textGreen: {
    color: '#33AB1E',
  },
  taskSideRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  taskStakes: {
    fontSize: 23,
    marginRight: 20,
  },
  taskDeadline: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  taskTitle: {
    fontSize: 20,
    marginBottom: 5,
  },
  taskBlock: {
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 10,
    borderRadius: 15,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.25,
  },
});
