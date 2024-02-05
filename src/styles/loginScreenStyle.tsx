import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  loginText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2A5364',
    textAlign: 'center',
  },
  login: {
    width: 300,
    marginTop: 15,
    marginBottom: 10,
    padding: 5,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#AAD9EB',
  },
  screen: {
    flex: 1,
  },
  container: {
    height: '100%',
    justifyContent: 'center',
  },
  containerInner: {
    padding: 24,
    fontSize: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
  },
  credentials: {
    alignItems: 'flex-end',
  },
  inputTitle: {
    textAlign: 'right',
    marginLeft: 10,
    margin: 20,
    fontSize: 18,
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'row',
  },
  inputField: {
    backgroundColor: 'grey',
    opacity: 0.5,
    width: '50%',
    margin: 12,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1,
    borderRadius: 5,
    fontWeight: 'normal',
  },
  titleGroup: {
    fontSize: 50,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 15,
  },
  text: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  backgroundImage: {
    width: '140%',
    height: '140%',
    opacity: 0.5,
    position: 'absolute',
    top: '-70%',
    left: '-40%',
  },
  logoBordered: {
    width: 60,
    height: 60,
  },
  register: {
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
  },
  registerText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2A5364',
    textAlign: 'center',
  },
  helpImageStyle: {
    width: 22,
    height: 22,
  },
  helpButtonBox: {
    marginLeft: '91%',
    marginTop: 10,
    padding: 5,
  },
});
