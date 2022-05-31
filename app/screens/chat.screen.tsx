import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {useAuth} from '../contexts/auth.context';
import {IMessage} from '../interfaces';
import {ChatProps} from '../navigators/app.navigator';

export const Chat = ({route}: ChatProps) => {
  const {state} = useAuth();
  const {roomId} = route.params;
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    state.ref.once('value').then(function (snapshot: any) {
      snapshot.forEach(function (chat: any) {
        if (chat.val()._id == roomId) {
          setMessages(renderMessages(chat.val().msg));
        }
      });
    });
  }, []);

  const renderMessages = useCallback(msgs => {
    return msgs
      ? msgs
          .reverse()
          .map((msg: {user: {_id: any; name: any}}, index: any) => ({
            ...msg,
            _id: index,
            user: {
              _id: msg.user._id,
              name: msg.user.name,
            },
          }))
      : [];
  }, []);

  const onSend = useCallback((msg = []) => {
    state.ref.once('value').then(function (snapshot: any) {
      snapshot.forEach(async function (chat: any) {
        if (chat.val()._id == roomId) {
          let msgs = renderMessages(chat.val().msg);
          let newMsgs = [...msgs.reverse(), msg[0]];
          console.log(chat.ref.child('msg'));

          chat.ref.child('msg').set(newMsgs);
        }
      });
    });

    setMessages(previousMessages => GiftedChat.append(previousMessages, msg));
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      user={{
        _id: state.firebaseId,
        name: state.googleUser.givenName,
        avatar:
          state.googleUser.photo ||
          'https://www.aagaardefterskole.dk/wp-content/uploads/2021/08/Kristian-Houbak-e1628583243389.jpg',
      }}
      alignTop={true}
      alwaysShowSend={true}
      showUserAvatar={true}
    />
  );
};
