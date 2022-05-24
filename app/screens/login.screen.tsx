import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {SafeAreaView} from 'react-native-safe-area-context';
import {sharedStyles} from '../assets/styles/shared.styles';
import {useAuth} from '../contexts/auth.context';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {firebase, FirebaseDatabaseTypes} from '@react-native-firebase/database';

GoogleSignin.configure();

export const Login = () => {
  const {state, setState} = useAuth();
  let reference: FirebaseDatabaseTypes.Reference | null = null;

  useEffect(() => {
    // if (state.token) {
    //   reference = firebase
    //     .app()
    //     .database(
    //       'https://fir-practice-e088c-default-rtdb.europe-west1.firebasedatabase.app/',
    //     )
    //     .ref('user/' + state.token);
    // }
    console.log(state);
  }, [state]);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const credential = auth.GoogleAuthProvider.credential(idToken);
      await auth().signInWithCredential(credential);
      setState(credential);
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

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
