import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  textRed: {
    color: '#D03131',
  },
  textYellow: {
    color: '#9DA41D',
  },
  textGreen: {
    color: '#33AB1E',
  },
  line: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  stakes: {
    position: 'absolute',
    right: 0,
    fontSize: 30,
    fontFamily: 'Trebuchet MS',
  },
  title: {
    flexShrink: 1,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
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
