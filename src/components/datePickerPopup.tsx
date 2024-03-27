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
              <Pressable
                style={styles.dateTimeSelectorButton}
                onPress={() => {
                  setDateOrTime(dateOrTime === 'date' ? 'time' : 'date');
                }}>
                <Text style={styles.textStyle}>
                  {dateOrTime === 'time' ? 'Time' : 'Date'}
                </Text>
              </Pressable>
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
