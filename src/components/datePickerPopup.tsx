import React from 'react';
import {Modal, Pressable, Text, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import themeProvider from '../providers/themeProvider';
import useMe from '../services/taskratchet/useMe';
import {styles} from '../styles/datePickerPopupStyle';
import useIsDarkMode from '../utils/checkDarkMode';
import type {DatePickerPopupProps} from './types';

export default function DatePickerPopup({
  dateModalVisible,
  setDateModalVisible,
  date,
  onDateChange: setChosenDate,
}: DatePickerPopupProps): JSX.Element {
  const {data: user} = useMe();

  const isDarkMode = useIsDarkMode();

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? themeProvider.colorsDark.secondaryLight
      : themeProvider.colorsLight.secondary,
  };

  const textColorStyle = {
    color: isDarkMode ? 'white' : 'black',
  };

  const onDateChange = (event, selectedDate) => {
    setChosenDate(selectedDate);
  };

  const [dateOrTime, setDateOrTime] = React.useState('date');

  return (
    <View>
      <Modal visible={dateModalVisible} transparent={true} animationType="none">
        <View style={styles.centeredView}>
          <View style={[styles.modalView, backgroundStyle]}>
            <View style={styles.datePickerGroup}>
              <Text style={[textColorStyle]}>Select Date and Time</Text>
              <View style={styles.dateTimeSelector}>
                <Pressable
                  style={[
                    styles.dateTimeSelectorButton,
                    {backgroundColor: isDarkMode ? '#303030' : '#EFEFF0'},
                  ]}
                  onPress={() => {
                    setDateOrTime('date');
                  }}
                  disabled={dateOrTime === 'date'}>
                  <Text
                    style={[
                      styles.textStyle,
                      {
                        color:
                          dateOrTime === 'date'
                            ? 'gray'
                            : isDarkMode
                              ? 'white'
                              : 'black',
                      },
                    ]}>
                    Date
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.dateTimeSelectorButton,
                    {backgroundColor: isDarkMode ? '#303030' : '#EFEFF0'},
                  ]}
                  onPress={() => {
                    setDateOrTime('time');
                  }}
                  disabled={dateOrTime === 'time'}>
                  <Text
                    style={[
                      styles.textStyle,
                      {
                        color:
                          dateOrTime === 'time'
                            ? 'gray'
                            : isDarkMode
                              ? 'white'
                              : 'black',
                      },
                    ]}>
                    Time
                  </Text>
                </Pressable>
              </View>
              {dateOrTime === 'date' ? (
                <DateTimePicker
                  style={styles.datePicker}
                  value={date}
                  mode="date"
                  display="spinner"
                  onChange={onDateChange}
                />
              ) : (
                <DateTimePicker
                  style={styles.datePicker}
                  value={date}
                  mode="time"
                  display="spinner"
                  onChange={onDateChange}
                />
              )}
              <Text style={[textColorStyle]}>{user?.timezone}</Text>
            </View>
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
                setDateModalVisible(!dateModalVisible);
              }}>
              <Text style={styles.textStyle}>Set</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
