// react imports:
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import * as React from 'react';
import {useState} from 'react';
import {enableScreens} from 'react-native-screens';

import {userType} from './components/types';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';

enableScreens();

const Stack = createStackNavigator();

export const UserContext = React.createContext({
  currentUser: null,
  setCurrentUser: (_value: userType | null) => {},
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
