import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {ChatRoom} from './chatRoom';
import {roomCard} from '../interfaces';
import {useAuth} from '../contexts/auth.context';

interface RoomViewProps {
  data: roomCard[];
}

export const RoomView: React.FC<RoomViewProps> = ({data}: RoomViewProps) => {
  const {state} = useAuth();
  const [chats, setChats] = useState<any[]>([]);

  useEffect(() => {
    state.ref.once('value').then((snapshot: any[]) => {
      let chatList: any[] = [];
      snapshot.forEach(chat => chatList.push(chat.val()));
      setChats(chatList);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={item => item._id}
        renderItem={({item}) => {
          return <ChatRoom _id={item._id} room={item} />;
        }}
      />
      <TouchableOpacity style={styles.fab}>
        <Image
          style={styles.fabimg}
          source={{
            uri: 'https://pics.freeicons.io/uploads/icons/png/3098380721630416062-512.png',
          }}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  fab: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    position: 'absolute',
    bottom: 10,
    right: 10,
    height: 70,
    backgroundColor: '#fff',
    borderRadius: 100,
  },
  fabimg: {
    width: 50,
    height: 50,
  },
});
