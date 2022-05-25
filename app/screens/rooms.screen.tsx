import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {sharedStyles} from '../assets/styles/shared.styles';
import {RoomView} from '../components/roomView';
import {useAuth} from '../contexts/auth.context';
import {roomCard} from '../interfaces';
import {AppStackParamList} from '../navigators/app.navigator';

const DATA = [
  {
    id: '1',
    title: 'Family',
    desc: 'My family chat',
    img: 'https://images.seoghoer.dk/s3fs-public/media/article/pri_117278292.jpg',
  },
  {
    id: '2',
    title: 'School',
    desc: 'My school friends',
    img: 'https://digitalt.tv/wp-content/uploads/2020/12/Friends-HBO.jpg',
  },
  {
    id: '3',
    title: 'Ma Boo',
    desc: 'Chat kjhjkhjk hgjh gkj jkh kdskjhjkhjk hgjh gkj jkh kdsjflkjdsf ',
  },
];

type AppScreenNavigationType = StackNavigationProp<AppStackParamList, 'Rooms'>;

export const Rooms = () => {
  const {state} = useAuth();
  const [messages, setMessages] = useState<roomCard[]>([]);

  const navigation = useNavigation<AppScreenNavigationType>();
  const toChat = () => {
    navigation.navigate('Chat');
  };

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
        <RoomView data={messages} onPress={toChat} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...sharedStyles.container,
  },
});
