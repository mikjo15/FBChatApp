import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {sharedStyles} from '../assets/styles/shared.styles';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure();

export const Login = () => {
  const signIn = async () => {};

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={{...sharedStyles.fontRoboto, fontSize: 30}}>Log in</Text>
        <GoogleSigninButton
          onPress={signIn}
          style={{width: 192, height: 48}}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...sharedStyles.container,
  },
});
