// react imports:
import {SafeAreaView} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import * as React from 'react';

// local imports:
import isLightMode from './utils/checkDarkMode';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';

function App(): JSX.Element {
  const backgroundStyle = {
    backgroundColor: isLightMode() ? Colors.darker : Colors.lighter,
  };

  return (
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="LoginScreen">
    //     <Stack.Screen name="LoginScreen" component={LoginScreen} />
    //     <Stack.Screen name="HomeScreen" component={HomeScreen} />
    //     <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
    //   </Stack.Navigator>
    // </NavigationContainer>
    // <LoginScreen />
    <HomeScreen />
    // <SafeAreaView style={backgroundStyle}></SafeAreaView>
  );
}

export default App;
