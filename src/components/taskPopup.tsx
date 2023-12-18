//react imports
import {View, Text, Modal, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';

import {updateTask} from '../services/taskratchet/updateTask';

//local imports
import getStoredTasks from '../utils/getStoredTasks';
import checkDate from '../utils/checkDate';
import {TaskPopupProps, task} from './types';
import convertCents from '../utils/convertCents';
import {styles} from '../styles/taskPopupStyle';

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
    if (days === null) return {text: '', style: {}}; // TODO: this is a temporary fix for null data
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
      return 'Task not found';
    }
  }

  const deadlineDetails =
    tasks && tasks[item] && tasks[item].due
      ? getDeadlineDetails(checkDate(tasks[item].due))
      : {text: '', style: {}};

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
                  {tasks && tasks !== null && tasks.length > 0
                    ? tasks[item].task
                    : 'Loading...'}
                </Text>
                <Text style={deadlineDetails.style}>
                  {deadlineDetails.text}
                </Text>
              </View>
              <Text style={styles.stakes}>
                {tasks && tasks[item]
                  ? convertCents(tasks[item].cents)
                  : 'Loading...'}
              </Text>
            </View>
            {tasks && tasks[item] && checkDate(tasks[item].due) >= 0 ? (
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