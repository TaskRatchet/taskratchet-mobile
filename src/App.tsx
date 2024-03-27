import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {enableScreens} from 'react-native-screens';

import {WithSplashScreen} from './components/splash';
import Authenticated from './screens/Authenticated';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import 'react-native-url-polyfill/auto';
import {initializeFirebase} from './firebase/localGetAuth';

initializeFirebase();

enableScreens();

const queryClient = new QueryClient();

const Stack = createStackNavigator();

function AppInter(): JSX.Element {
  return (
    <WithSplashScreen isAppReady={true}>
      <NavigationContainer>
        <Authenticated>
          <Stack.Navigator
            initialRouteName={'HomeScreen'}
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          </Stack.Navigator>
        </Authenticated>
      </NavigationContainer>
    </WithSplashScreen>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppInter />
    </QueryClientProvider>
  );
}
