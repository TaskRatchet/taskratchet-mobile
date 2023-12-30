import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
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
