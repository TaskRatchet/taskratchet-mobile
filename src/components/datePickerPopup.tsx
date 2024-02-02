import {useQuery} from '@tanstack/react-query';
import React from 'react';
import {Modal, Pressable, Text, View} from 'react-native';
import DatePicker from 'react-native-date-picker';

import themeProvider from '../providers/themeProvider';
import {getMe} from '../services/taskratchet/getMe';
import {styles} from '../styles/datePickerPopupStyle';
import useIsDarkMode from '../utils/checkDarkMode';
import type {DatePickerPopupProps} from './types';

export default function DatePickerPopup({
  dateModalVisible,
  setDateModalVisible,
  date,
  onDateChange,
}: DatePickerPopupProps): JSX.Element {
  const {data: user} = useQuery({queryKey: ['user'], queryFn: getMe});

  const isDarkMode = useIsDarkMode();

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? themeProvider.colorsDark.secondaryLight
      : themeProvider.colorsLight.secondary,
  };

  const textColorStyle = {
    color: isDarkMode ? 'white' : 'black',
  };

  return (
    <View>
      <Modal visible={dateModalVisible} transparent={true} animationType="none">
        <View style={styles.centeredView}>
          <View style={[styles.modalView, backgroundStyle]}>
            <View style={styles.datePickerGroup}>
              <Text style={[styles.textStyle, textColorStyle]}>
                Select Date:
              </Text>
              <DatePicker
                style={styles.datePicker}
                date={date}
                onDateChange={onDateChange}
              />
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
