//react imports
import {View, Text, StyleSheet, Modal, Alert, Pressable} from 'react-native';
import React, {useState} from 'react';

//local imports
import themeProvider from '../providers/themeProvider';
import tasks from '../utils/currentTasks';
import {TaskPopupProps} from './types';

export default function TaskPopup({
  item,
  modalVisible,
  setModalVisible,
}: TaskPopupProps): JSX.Element {
  // const {title, deadline, stakes} = tasksArray[Number(item)];
  return (
    <View>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>{tasks[item].title}</Text>
            <Text style={styles.description}>{tasks[item].description}</Text>
            <View style={styles.line}>
              <Text style={styles.deadline}>{tasks[item].deadline}</Text>
              <Text style={styles.stakes}>{tasks[item].stakes}</Text>
            </View>
            <Pressable
              style={[styles.button, styles.buttonComplete]}
              onPress={() => {
                console.log('complete'); /* DOTO: add completion logic */
              }}>
              <Text style={styles.textStyle}>Mark Complete</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
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
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stakes: {
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 5,
  },
  deadline: {
    fontSize: 16,
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
  button: {
    borderRadius: 20,
    margin: 5,
    padding: 10,
    elevation: 2,
  },
  buttonComplete: {
    backgroundColor: '#006745',
    marginTop: 40,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  background: {
    flex: 1,
  },
});
