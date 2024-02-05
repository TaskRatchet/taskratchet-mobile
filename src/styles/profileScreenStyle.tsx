import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  dataValueText: {
    fontSize: 18,
    maxWidth: '70%',
  },
  dataText: {
    fontWeight: 'bold',
    fontSize: 18,
    flex: 1,
  },
  dataGroup: {
    marginTop: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataPair: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    width: 300,
    padding: 8,
    margin: 8,
  },
  profileTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    marginLeft: 10,
    borderRadius: 15,
  },
  name: {
    fontSize: 30,
  },
  container: {
    padding: 24,
    flex: 1,
    alignItems: 'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  backgroundImage: {
    width: '140%',
    height: '80%',
    opacity: 0.5,
    position: 'absolute',
    top: '-30%',
    left: '-40%',
  },
  buttons: {
    marginTop: 20,
  },
});
