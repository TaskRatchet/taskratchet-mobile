import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: '90%',
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  confirmButton: {
    borderRadius: 20,
    margin: 5,
    padding: 10,
    elevation: 2,
  },
  cancelButton: {
    borderRadius: 20,
    margin: 5,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    marginBottom: 20,
    marginTop: 20,
    textAlign: 'center',
    fontSize: 16,
  },
});
