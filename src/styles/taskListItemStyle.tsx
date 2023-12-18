import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  footerGreen: {
    backgroundColor: '#33AB1E',
  },
  footerYellow: {
    backgroundColor: '#B6A30B',
  },
  footerRed: {
    backgroundColor: '#D03131',
  },
  footerGrey: {
    backgroundColor: '#A8A8A8',
  },
  statusFooter: {
    height: 5,
    marginTop: 10,
    marginBottom: -15,
    marginLeft: -20,
    marginRight: -20,
  },
  taskBlock: {
    padding: 15,
    paddingLeft: 20,
    paddingRight: 20,
    margin: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 1, height: 2},
    shadowOpacity: 0.25,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  textRed: {
    color: '#D03131',
  },
  textYellow: {
    color: '#9DA41D',
  },
  textGreen: {
    color: '#33AB1E',
  },
  taskSideRight: {
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  taskStakes: {
    fontSize: 23,
    marginRight: 0,
  },
  taskDeadline: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  taskTitle: {
    fontSize: 20,
    marginBottom: 5,
  },
});
