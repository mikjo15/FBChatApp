import {StyleSheet, Platform} from 'react-native';

export const sharedStyles = StyleSheet.create({
  fontRoboto: {
    fontFamily: Platform.OS === 'ios' ? 'Roboto Mono' : 'RobotoMono',
  },
  container: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
