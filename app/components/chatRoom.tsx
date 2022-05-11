import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {roomCard} from '../interfaces';

export const ChatRoom: React.FC<roomCard> = ({
  id,
  title,
  desc,
  img,
  onPress,
}: roomCard) => {
  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View style={styles.left}>
        <Image
          style={styles.chatImg}
          source={
            img?.length
              ? {uri: img}
              : {
                  uri: 'https://www.famouslogos.org/wp-content/uploads/2009/07/jumpman.png',
                }
          }
        />
      </View>
      <View style={styles.right}>
        <Text>{title}</Text>
        <Text>{desc}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 75,
    width: 300,
    backgroundColor: 'beige',
    borderRadius: 15,
    shadowColor: 'dimgray',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 10,
    shadowRadius: 8,
    paddingLeft: 16,
    paddingRight: 14,
    marginTop: 8,
    marginBottom: 8,
    marginLeft: 16,
    marginRight: 16,
  },
  left: {
    marginLeft: 10,
    marginRight: 20,
  },
  chatImg: {
    height: 50,
    width: 50,
    borderRadius: 20,
    resizeMode: 'contain',
  },
  right: {
    flexShrink: 1,
  },
});
