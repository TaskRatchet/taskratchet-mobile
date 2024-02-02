import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useState} from 'react';
import {Modal, Pressable, Text, TextInput, View} from 'react-native';

import themeProvider from '../providers/themeProvider';
import {addTask} from '../services/taskratchet/addTask';
import {styles} from '../styles/newTaskPopupStyle';
import useIsDarkMode from '../utils/checkDarkMode';
import DatePickerPopup from './datePickerPopup';
import PressableLoading from './pressableLoading';
import type {infoPopupProps} from './types';

export default function NewTaskPopup({
  modalVisible,
  setModalVisible,
}: infoPopupProps): JSX.Element {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: () =>
      addTask({
        task: taskData.title,
        due: taskData.date,
        cents: taskData.cents,
      }),
    onError: error => {
      console.error('Error adding task:', error);
    },
    onSettled: () => {
      return queryClient.invalidateQueries({queryKey: ['tasks']});
    },
  });
  const [chosenDate, setChosenDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    d.setHours(23, 59, 0, 0);
    return d;
  });

  const isDarkMode = useIsDarkMode();

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? themeProvider.colorsDark.secondaryLight
      : themeProvider.colorsLight.secondary,
  };

  const inputBackgroundStyle = {
    backgroundColor: isDarkMode ? '#303845' : '#EFEFF0',
  };

  const textColorStyle = {
    color: isDarkMode ? 'white' : 'black',
  };

  const [title, setTitle] = useState('');
  const [dollars, setDollars] = useState(5);
  const [failMessage, setFailMessage] = useState('');
  const [datePickerModalVisible, setDatePickerModalVisible] = useState(false);

  const taskData = {
    title: title,
    date: chosenDate,
    cents: dollars * 100,
  };

  function handleSetDatePress() {
    setDatePickerModalVisible(!datePickerModalVisible);
  }

  function resetTaskData() {
    setFailMessage('');
    setTitle('');
    setDollars(5);
    setChosenDate(() => {
      const d = new Date();
      d.setDate(d.getDate() + 7);
      d.setHours(23, 59, 0, 0);
      return d;
    });
  }

  return (
    <View>
      <Modal visible={modalVisible} transparent={true} animationType="none">
        <View style={styles.centeredView}>
          <View style={[styles.modalView, backgroundStyle]}>
            <View style={styles.titlePair}>
              <Text style={[styles.titleTextStyle, textColorStyle]}>Task</Text>
              <TextInput
                style={[styles.input, inputBackgroundStyle, textColorStyle]}
                keyboardType="default"
                placeholder="Enter Title"
                onChangeText={text => setTitle(text)}
              />
            </View>

            <View style={styles.centsPair}>
              <Text style={[styles.textStyle, textColorStyle]}>Stakes</Text>
              <TextInput
                style={[styles.input, inputBackgroundStyle, textColorStyle]}
                keyboardType="numeric"
                placeholder="Enter Value"
                onChangeText={text => setDollars(parseFloat(text))}
              />
            </View>

            <View style={styles.datePair}>
              <Text style={[styles.textStyle, textColorStyle]}>Date</Text>
              <Pressable
                style={[styles.inputEmulatorBox, inputBackgroundStyle]}
                onPress={() => {
                  handleSetDatePress();
                }}>
                <Text style={[styles.textStyleInputEmulator, textColorStyle]}>
                  {chosenDate.toLocaleString([], {
                    dateStyle: 'short',
                    timeStyle: 'short',
                  })}
                </Text>
              </Pressable>
            </View>

            <Text style={styles.failMessageTextStyle}>{failMessage}</Text>

            <PressableLoading
              loading={mutation.isPending}
              loadingTextStyle={styles.buttonText}
              style={({pressed}) => [
                {
                  backgroundColor: pressed
                    ? 'rgba(33, 150, 243, 0.5)'
                    : '#2196F3',
                },
                styles.createButton,
              ]}
              onPress={() => {
                if (taskData.title !== '' && taskData.cents !== 0) {
                  mutation.mutate();
                  setModalVisible(!modalVisible);
                  resetTaskData();
                } else {
                  console.error('Invalid task data');
                  setFailMessage('Title and Value must be set');
                }
              }}>
              <Text style={styles.buttonText}>Create</Text>
            </PressableLoading>
            <Pressable
              style={({pressed}) => [
                {
                  backgroundColor: pressed
                    ? 'rgba(33, 150, 243, 0.5)'
                    : '#2196F3',
                },
                styles.button,
              ]}
              onPress={() => {
                setModalVisible(!modalVisible);
                resetTaskData();
              }}>
              <Text style={styles.buttonText}>Hide</Text>
            </Pressable>
          </View>
        </View>
        <DatePickerPopup
          testID="datePickerPopup"
          dateModalVisible={datePickerModalVisible}
          setDateModalVisible={setDatePickerModalVisible}
          date={chosenDate}
          onDateChange={setChosenDate}
        />
      </Modal>
    </View>
  );
}
