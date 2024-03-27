import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  scroll: {
    height: '100%',
  },
  date: {
    fontSize: 20,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
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
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
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
  taskList: {
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
  },
  avatar: {
    width: 50,
    height: 50,
    marginLeft: 10,
    borderRadius: 15,
  },
  name: {
    fontSize: 30,
    height: 40,
  },
  userProfile: {
    marginLeft: 10,
    marginTop: 0,
    fontSize: 18,
    height: 33,
  },
  navBar: {},
  profile_infoButtons: {
    flex: 1,
    flexContent: 'space_between',
    flexDirection: 'row',
    alignContent: 'center',
  },
  profileImage: {
    marginLeft: 10,
    marginTop: 0,
    width: 18,
    height: 18,
  },
  infoImageStyle: {
    marginRight: 10,
    marginTop: 0,
    width: 22,
    height: 22,
  },
  helpImageStyle: {
    marginRight: 5,
    marginTop: 0,
    width: 22,
    height: 22,
  },
  infoHelpPair: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  plusImage: {
    width: 30,
    height: 30,
  },
  plusImageBox: {
    position: 'absolute',
    bottom: '5%',
    right: '8%',
    padding: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.8,
  },
  headerStylesBox: {
    margin: 50,
    alignItems: 'center',
  },
  screenTitle: {
    fontSize: 28,
  },
  imageStyle: {
    width: '140%',
    height: '80%',
    opacity: 0.5,
    position: 'absolute',
    top: '-30%',
    left: '-40%',
  },
  spacer: {
    height: 100,
  },
  selectorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 10,
    margin: 20,
    marginBottom: 10,
  },
  noTasksContainer: {
    fontSize: 20,
    textAlign: 'center',
    margin: 20,
    borderRadius: 10,
    padding: 10,
  },
  noTasks: {
    fontSize: 20,
    textAlign: 'center',
  },
  tabButton: {
    padding: 10,
  },
});
