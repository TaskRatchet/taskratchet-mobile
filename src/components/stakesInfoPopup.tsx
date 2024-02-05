import React from 'react';
import {Modal, Pressable, Text, View} from 'react-native';

import themeProvider from '../providers/themeProvider';
import {styles} from '../styles/stakesInfoPopupStyle';
import useIsDarkMode from '../utils/checkDarkMode';
import type {stakesInfoPopupProps} from './types';

export default function StakesInfoPopup({
  stakesInfoModalVisible,
  setStakesInfoModalVisible,
}: stakesInfoPopupProps): JSX.Element {
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
      <Modal
        visible={stakesInfoModalVisible}
        transparent={true}
        animationType="none">
        <View style={styles.centeredView}>
          <View style={[styles.modalView, backgroundStyle]}>
            <Text style={[styles.paragraph, textColorStyle]}>
              <Text>
                Setting stakes helps you stay committed to your goals. When
                creating a task, you assign a monetary value to it. Here's how
                it works:
              </Text>
              {'\n\n'}
              <Text style={styles.bold}>Stakes Amount: </Text>
              <Text>
                This is the amount you pledge to pay if you don't complete the
                task on time.
              </Text>
              {'\n'}
              <Text style={styles.bold}>Completion Deadline: </Text>
              <Text>
                If you mark the task as complete before the deadline you set,
                you won't be charged.
              </Text>
              {'\n\n'}
              <Text style={styles.bold}>Why set stakes? </Text>
              <Text>
                {'\n'}
                <Text style={styles.bold}>Motivation: </Text>
                Adding stakes adds a level of motivation to your tasks.
                {'\n'}
                <Text style={styles.bold}>Accountability: </Text>
                Committing to a financial stake can help you stay accountable to
                your goals.
                {'\n'}
                <Text style={styles.bold}>Reward for Success: </Text>
                Successfully completing tasks on time means you keep your money.
              </Text>
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
              onPress={() =>
                setStakesInfoModalVisible(!stakesInfoModalVisible)
              }>
              <Text style={styles.buttonTextStyle}>Hide</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
