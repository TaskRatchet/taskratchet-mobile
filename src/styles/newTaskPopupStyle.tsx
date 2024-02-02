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
  button: {
    borderRadius: 20,
    margin: 5,
    padding: 10,
    elevation: 2,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  createButton: {
    borderRadius: 20,
    margin: 5,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  datePair: {
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  titlePair: {
    marginBottom: 10,
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  titleTextStyle: {
    marginBottom: 5,
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    fontSize: 18,
    padding: 6,
    paddingRight: 12,
    paddingLeft: 12,
    borderRadius: 7,
  },
  centsPair: {
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  textStyleInputEmulator: {
    fontSize: 18,
  },
  failMessageTextStyle: {
    fontSize: 15,
    color: '#ff0000',
    textAlign: 'center',
  },
  inputEmulatorBox: {
    width: '100%',
    padding: 6,
    paddingRight: 12,
    paddingLeft: 12,
    borderRadius: 7,
  },
});
