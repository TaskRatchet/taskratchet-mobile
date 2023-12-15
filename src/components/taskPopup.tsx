//react imports
import {View, Text, StyleSheet, Modal, Alert, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {updateTask} from '../services/taskratchet/updateTask';

//local imports
import themeProvider from '../providers/themeProvider';
import getStoredTasks from '../utils/currentTasks';
import checkDate from '../utils/checkDate';
import useIsDarkMode from '../utils/checkDarkMode';
import tasks from '../utils/currentTasks';
import {TaskPopupProps, task} from './types';
import convertCents from '../utils/convertCents';

export default function TaskPopup({
  item,
  modalVisible,
  setModalVisible,
}: TaskPopupProps): JSX.Element {
  const [tasks, setTasks] = useState<task[]>([]);

  useEffect(() => {
    async function fetchTasks() {
      const fetchedTasks = await getStoredTasks();
      setTasks(fetchedTasks);
    }

    fetchTasks();
  }, []);

  function getDeadlineDetails(days: number) {
    if (days === null) return {text: '', style: {}}; // this is a temporary fix for null data
    switch (true) {
      case days < 0:
        return {text: 'Overdue', style: styles.textRed};
      case days === 0:
        return {text: 'Due Today', style: styles.textYellow};
      case days === 1:
        return {text: 'Due Tomorrow', style: styles.textYellow};
      default:
        return {text: 'Due in ' + days + ' days', style: styles.textGreen};
    }
  }

  function CompletionText() {
    if (item !== undefined && tasks[item] !== undefined) {
      if (tasks[item].complete !== undefined && tasks[item].complete) {
        return 'Mark Incomplete';
      } else {
        return 'Mark Complete';
      }
    } else {
      // return a default value or handle the error appropriately
      return 'Task not found';
    }
  }

  const deadlineDetails =
    tasks && tasks[item] && tasks[item].due
      ? getDeadlineDetails(checkDate(tasks[item].due))
      : {text: '', style: {}};

  if (tasks && tasks[item]) {
    console.log(tasks[item]);
  }

  return (
    <View>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.line}>
              <View>
                <Text style={styles.title} numberOfLines={1}>
                  {tasks !== null && tasks.length > 0
                    ? tasks[item].task
                    : 'Loading...'}
                </Text>
                <Text style={deadlineDetails.style}>
                  {deadlineDetails.text}
                </Text>
              </View>
              <Text style={styles.stakes}>
                {tasks[item] ? convertCents(tasks[item].cents) : 'Loading...'}
              </Text>
            </View>
            {tasks[item] && checkDate(tasks[item].due) >= 0 ? (
              <Pressable
                style={({pressed}) => [
                  {
                    backgroundColor: pressed
                      ? 'rgba(0, 103, 69, 0.5)'
                      : '#006745',
                  },
                  styles.button,
                  styles.buttonComplete,
                ]}
                onPress={() => {
                  if (tasks[item].complete) {
                    updateTask(tasks[item].id, {complete: false});
                  } else {
                    updateTask(tasks[item].id, {complete: true});
                  }
                }}>
                <Text style={styles.textStyle}>{CompletionText()}</Text>
              </Pressable>
            ) : null}
            <Pressable
              style={({pressed}) => [
                {
                  backgroundColor: pressed
                    ? 'rgba(33, 150, 243, 0.5)'
                    : '#2196F3',
                  marginTop:
                    tasks[item] && checkDate(tasks[item].due) >= 0 ? 5 : 35,
                },
                styles.button,
              ]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stakes: {
    fontSize: 30,
    fontFamily: 'Trebuchet MS',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
  },
  deadline: {
    fontSize: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
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
    margin: 5,
    padding: 10,
    elevation: 2,
  },
  buttonComplete: {
    marginTop: 40,
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
});
