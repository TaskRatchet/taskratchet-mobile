// react imports:
import React from 'react';
import {SafeAreaView} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

// local imports:
import useIsDarkMode from './utils/CheckDarkmode';
import LoginScreen from './screens/LoginScreen'; // replace with actual path

function App(): JSX.Element {
  const backgroundStyle = {
    backgroundColor: useIsDarkMode() ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <LoginScreen />
    </SafeAreaView>
  );
}

export default App;
