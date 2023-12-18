import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  dataValueText: {
    fontSize: 18,
  },
  dataText: {
    fontWeight: 'bold',
    fontSize: 18,
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
  nameAndAvatar: {
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
});
