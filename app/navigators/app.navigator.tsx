import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Rooms} from '../screens/rooms.screen';
import {Chat} from '../screens/chat.screen';
import {Button} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import auth from '@react-native-firebase/auth';
import {useAuth} from '../contexts/auth.context';

export type AppStackParamList = {
  Rooms: undefined;
  Chat: {roomId: string};
};

export type ChatProps = NativeStackScreenProps<AppStackParamList, 'Chat'>;

const Stack = createStackNavigator<AppStackParamList>();

export const AppNavigator = () => {
  const {setState} = useAuth();

  const logOut = () => {
    auth()
      .signOut()
      .then(() => {
        setState({auth: false});
      });
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
