// react imports:
import {SafeAreaView} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useState} from 'react';

// local imports:
import isLightMode from './utils/checkDarkMode';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import {enableScreens} from 'react-native-screens';
import User from './utils/currentUser';
import {userType} from './components/types';

enableScreens();

const Stack = createStackNavigator();

export const UserContext = React.createContext({
  currentUser: null,
  setCurrentUser: (value: userType | null) => {},
} as {
  currentUser: userType | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<userType | null>>;
});

function App(): JSX.Element {
  const [currentUser, setCurrentUser] = useState<userType | null>(null);

  return (
    <UserContext.Provider value={{currentUser, setCurrentUser}}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}

export default App;
