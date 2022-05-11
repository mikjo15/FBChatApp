import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Rooms} from '../screens/rooms.screen';
import {Chat} from '../screens/chat.screen';
import {Button} from 'react-native';

export type AppStackParamList = {
  Rooms: undefined;
  Chat: undefined; // Needs to be changed when it takes params!
};

const Stack = createStackNavigator<AppStackParamList>();

export const AppNavigator = () => {
  const logOut = () => {
    console.log('Log user out');
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Rooms"
        component={Rooms}
        options={{
          headerRight: () => {
            return <Button onPress={logOut} title="Log out" color="black" />;
          },
        }}
      />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};
