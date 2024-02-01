import DatePickerIOS from '@react-native-community/datetimepicker';
import {useMutation, useQueryClient} from '@tanstack/react-query';
import React, {useState} from 'react';
import {Modal, Pressable, Text, TextInput, View} from 'react-native';

import themeProvider from '../providers/themeProvider';
import {addTask} from '../services/taskratchet/addTask';
import {styles} from '../styles/newTaskPopupStyle';
import useIsDarkMode from '../utils/checkDarkMode';
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
  const [chosenDate, setChosenDate] = useState(new Date());

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
  const [dollars, setDollars] = useState(0);

  const taskData = {
    title: title,
    date: chosenDate,
    cents: dollars * 100,
  };

  return (
    <View>
      <Modal visible={modalVisible} transparent={true} animationType="none">
        <View style={styles.centeredView}>
          <View style={[styles.modalView, backgroundStyle]}>
            <View style={styles.titlePair}>
              <Text style={[styles.textStyle, textColorStyle]}>
                Set Task Title:
              </Text>
              <TextInput
                style={[styles.titleInput, inputBackgroundStyle]}
                keyboardType="default"
                placeholder="Enter Title"
                onChangeText={text => setTitle(text)}
              />
            </View>
            <View style={styles.datePair}>
              <Text style={[styles.textStyle, textColorStyle]}>
                Select Date:
              </Text>
              <DatePickerIOS
                style={styles.datePicker}
                value={chosenDate}
                onChange={(event, selectedDate: Date | undefined) => {
                  setChosenDate(selectedDate || chosenDate);
                }}
              />
            </View>
            <View style={styles.centsPair}>
              <Text style={[styles.textStyle, textColorStyle]}>Set Value:</Text>
              <TextInput
                style={[styles.titleInput, inputBackgroundStyle]}
                keyboardType="numeric"
                placeholder="Enter Value"
                onChangeText={text => setDollars(parseFloat(text))}
              />
            </View>

            <Pressable
              style={({pressed}) => [
                {
                  backgroundColor: pressed
                    ? 'rgba(33, 150, 243, 0.5)'
                    : '#2196F3',
                },
                styles.createButton,
              ]}
              onPress={() => mutation.mutate()}>
              <Text style={styles.textStyle}>Create</Text>
            </Pressable>
            <Pressable
              style={({pressed}) => [
                {
                  backgroundColor: pressed
                    ? 'rgba(33, 150, 243, 0.5)'
                    : '#2196F3',
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
