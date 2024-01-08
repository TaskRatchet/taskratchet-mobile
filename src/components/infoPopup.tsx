import React from 'react';
import {Modal, Pressable, Text, View} from 'react-native';

import themeProvider from '../providers/themeProvider';
import {styles} from '../styles/infoPopupStyle';
import useIsDarkMode from '../utils/checkDarkMode';
import type {infoPopupProps} from './types';

export default function InfoPopup({
  modalVisible,
  setModalVisible,
}: infoPopupProps): JSX.Element {
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
      <Modal visible={modalVisible} transparent={true} animationType="none">
        <View style={styles.centeredView}>
          <View style={[styles.modalView, backgroundStyle]}>
            <Text style={[styles.paragraph, textColorStyle]}>
              This is the Main Task Ratchet task list. Here you will find all
              your tasks along with their value and status. A task that you have
              not marked complete and there is more than a week to its
              deaadline, will be marked with a{' '}
              <Text style={styles.footerYellow}>YELLOW</Text> bar. A task not
              marked complete and that has a deadline closer than a week out
              will be marked with a <Text style={styles.footerRed}>RED</Text>{' '}
              bar. A task that is overdue and not complete will be marked with a
              <Text style={styles.footerGrey}> GREY</Text> bar. Finally, any
              task you have completed will be marked with a{' '}
              <Text style={styles.footerGreen}>GREEN</Text> bar.
            </Text>
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
