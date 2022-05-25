import {QuickReplies, User} from 'react-native-gifted-chat';

export interface roomCard {
  _id: string;
  title: string;
  desc: string;
  img?: string;
  onPress?: () => void;
}

export interface IMessage {
  _id: string | number;
  text: string;
  createdAt: Date | number;
  user: User;
  image?: string;
  video?: string;
  audio?: string;
  system?: boolean;
  sent?: boolean;
  received?: boolean;
  pending?: boolean;
  quickReplies?: QuickReplies;
}
