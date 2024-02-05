// react imports:
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import * as React from 'react';
import {useState} from 'react';
import {enableScreens} from 'react-native-screens';

import {WithSplashScreen} from './components/splash';
import {userType} from './components/types';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';

enableScreens();

const queryClient = new QueryClient();

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

  const isAppReady = true;

  return (
    <QueryClientProvider client={queryClient}>
      <WithSplashScreen isAppReady={isAppReady}>
        <UserContext.Provider value={{currentUser, setCurrentUser}}>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="LoginScreen"
              screenOptions={{
                headerShown: false,
              }}>
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="HomeScreen" component={HomeScreen} />
              <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </UserContext.Provider>
      </WithSplashScreen>
    </QueryClientProvider>
  );
}

export default App;
