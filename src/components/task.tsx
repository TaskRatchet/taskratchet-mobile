//react imports
import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

//local imports
import themeProvider from '../providers/themeProvider';
import tasks from '../utils/currentTasks';
import {taskType, tasksType} from './types';

const tasksArray = Object.values(tasks) as Task[];

export default function Task({item}: {item: string}): JSX.Element {
  const {title, deadline, stakes} = tasksArray[Number(item)];
  return (
    <View style={styles.taskBlock}>
      <View>
        <Text style={styles.taskTitle}>{title}</Text>
        <Text style={styles.taskDeadline}>{deadline}</Text>
      </View>

      <View style={styles.taskSideRight}>
        <Text style={styles.taskStakes}>{stakes}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  taskSideRight: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  taskStakes: {
    fontSize: 23,
    marginRight: 10,
  },
  taskDeadline: {
    fontSize: 10,
  },
  taskTitle: {
    fontSize: 20,
  },
  taskBlock: {
    backgroundColor: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    flexDirection: 'row',
  },
});
