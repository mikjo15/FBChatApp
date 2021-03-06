import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AppNavigator} from './app.navigator';
import {AuthNavigator} from './auth.navigator';
import {SplashScreen} from '../screens/splash.screen';

const Stack = createStackNavigator();

export const RootNavigator = () => {
  const auth = false;
  const loading = false;

  return (
    <NavigationContainer>
      {loading ? (
        <Stack.Navigator>
          <Stack.Screen name="Splash" component={SplashScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{presentation: 'card', headerShown: false}}>
          {auth ? (
            <Stack.Screen name="App" component={AppNavigator} />
          ) : (
            <Stack.Screen name="Auth" component={AuthNavigator} />
          )}
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
