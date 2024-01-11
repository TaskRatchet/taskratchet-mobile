import {useMutation} from '@tanstack/react-query';
import React from 'react';
import {Modal, Pressable, Text, View} from 'react-native';

import themeProvider from '../providers/themeProvider';
import {TaskInput, updateTask} from '../services/taskratchet/updateTask';
import {styles} from '../styles/taskPopupStyle';
import useIsDarkMode from '../utils/checkDarkMode';
import checkDate from '../utils/checkDate';
import {TaskPopupProps} from './types';

export default function TaskPopup({
  item,
  modalVisible,
  setModalVisible,
}: TaskPopupProps): JSX.Element {
  const isDarkMode = useIsDarkMode();

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? themeProvider.colorsDark.secondary
      : themeProvider.colorsLight.secondary,
  };

  const textColorStyle = {
    color: isDarkMode ? 'white' : 'black',
  };

  const mutation = useMutation({
    mutationFn: (vars: {taskId: string; data: TaskInput}) => {
      return updateTask(vars.taskId, vars.data);
    },
    onError: error => {
      console.error('Error updating task:', error);
    },
  });

  function getDeadlineDetails(days: number) {
    if (days === null) {
      return {text: '', style: {}}; // TODO: this is a temporary fix for null data
    }
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

  const deadlineDetails = item && getDeadlineDetails(checkDate(item.due));

  return (
    <View>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        {item ? (
          <View style={styles.centeredView}>
            <View style={[styles.modalView, backgroundStyle]}>
              <View style={styles.line}>
                <View>
                  <Text style={[styles.title, textColorStyle]}>
                    {item.task}
                  </Text>
                  <Text style={deadlineDetails?.style}>
                    {deadlineDetails?.text}
                  </Text>
                </View>
                <Text style={[styles.stakes, textColorStyle]}>
                  {item.cents}
                </Text>
              </View>
              {checkDate(item.due) >= 0 ? (
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
                    mutation.mutate({
                      taskId: item.id,
                      data: {complete: !item.complete},
                    });
                  }}>
                  <Text style={styles.textStyle}>
                    {item.complete ? 'Mark Incomplete' : 'Mark Complete'}
                  </Text>
                </Pressable>
              ) : null}
              <Pressable
                style={({pressed}) => [
                  {
                    backgroundColor: pressed
                      ? 'rgba(33, 150, 243, 0.5)'
                      : '#2196F3',
                    marginTop: checkDate(item.due) >= 0 ? 5 : 35,
                  },
                  styles.button,
                ]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Hide</Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <Text>Failed to find selected item</Text>
        )}
      </Modal>
    </View>
  );
}
