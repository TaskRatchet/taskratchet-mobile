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
  titleStyle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 0,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 0,
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
  label: {
    fontSize: 15,
    textAlign: 'left',
  },
  input: {
    width: '100%',
    fontSize: 18,
    padding: 6,
    paddingRight: 12,
    paddingLeft: 12,
    marginTop: 5,
    borderRadius: 7,
  },
  label_input_group: {
    justifyContent: 'space-between',
    marginTop: 15,
  },
  label_input_groups: {
    marginBottom: 20,
  },
});
