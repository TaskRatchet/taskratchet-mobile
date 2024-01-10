import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#1A2533',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 250,
    height: 250,
  },
  text: {
    color: 'white',
    fontSize: 10,
    marginTop: 16,
  },
  title: {
    color: 'white',
    fontSize: 24,
    marginTop: 16,
  },
});
