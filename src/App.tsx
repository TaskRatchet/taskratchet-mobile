// react imports:
import React from 'react';
import {SafeAreaView} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

// local imports:
import isLightMode from './utils/checkDarkMode';
import LoginScreen from './screens/LoginScreen'; // replace with actual path

function App(): JSX.Element {
  const backgroundStyle = {
    backgroundColor: isLightMode() ? Colors.darker : Colors.lighter,
  };

  return (
    <LoginScreen />
    // <SafeAreaView style={backgroundStyle}></SafeAreaView>
  );
}

export default App;
