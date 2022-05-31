import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {sharedStyles} from '../assets/styles/shared.styles';
import {RoomView} from '../components/roomView';
import {useAuth} from '../contexts/auth.context';
import {roomCard} from '../interfaces';

export const Rooms = () => {
  const {state} = useAuth();
  const [messages, setMessages] = useState<roomCard[]>([]);

  useEffect(() => {
    let initMsg: roomCard[] = [];
    state.ref.once('value', (snapshot: any[]) => {
      snapshot.forEach(child => {
        initMsg.push(child);
      });
      setMessages(initMsg);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <RoomView data={messages} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...sharedStyles.container,
  },
});
