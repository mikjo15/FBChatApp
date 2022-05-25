import React from 'react';
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {ChatRoom} from './chatRoom';
import {roomCard} from '../interfaces';

interface RoomViewProps {
  data: roomCard[];
  onPress: () => void;
}

export const RoomView: React.FC<RoomViewProps> = ({
  data,
  onPress,
}: RoomViewProps) => {
  const data2 = [
    {
      _id: '1',
      desc: 'My family chat',
      img: 'https://images.seoghoer.dk/s3fs-public/media/article/pri_117278292.jpg',
      m1: {
        _id: 'bKZGQ06MezXZyjOk9AOoXYxijQs1',
        text: 'First encounter',
        user: {_id: '2', name: 'Kristian'},
      },
      title: 'Family',
    },
  ];

  console.log('Data: ', data[0]);
  console.log();
  console.log('Data2: ', data2);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data2}
        renderItem={({item}) => {
          return (
            <ChatRoom
              _id={'1'}
              title={item.title}
              desc={item.desc}
              img={item.img}
              onPress={onPress}
            />
          );
        }}
        keyExtractor={item => item._id}
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
