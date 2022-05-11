import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {IMessage} from '../interfaces';

export function Chat() {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1,
        name: 'Mikkel',
        avatar:
          'https://www.aagaardefterskole.dk/wp-content/uploads/2021/08/Kristian-Houbak-e1628583243389.jpg',
      }}
      alignTop={true}
      alwaysShowSend={true}
      showUserAvatar={true}
    />
  );
}
