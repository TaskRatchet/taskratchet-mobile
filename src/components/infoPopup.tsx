//react imports
import {View, Text, StyleSheet, Modal, Alert, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';

//local imports
import themeProvider from '../providers/themeProvider';
import type {infoPopupProps} from './types';

export default function InfoPopup({
  modalVisible,
  setModalVisible,
}: infoPopupProps): JSX.Element {
  return (
    <View>
      <Modal visible={modalVisible} transparent={true} animationType="none">
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.paragraph}>
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

const styles = StyleSheet.create({
  footerGreen: {
    color: '#33AB1E',
  },
  footerYellow: {
    color: '#B6A30B',
  },
  footerRed: {
    color: '#D03131',
  },
  footerGrey: {
    color: '#A8A8A8',
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
    margin: 5,
    marginBottom: 15,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    margin: 5,
    padding: 10,
    elevation: 2,
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
});
