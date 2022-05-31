import React, {useEffect, useState} from 'react';
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
import {firebase} from '@react-native-firebase/database';

GoogleSignin.configure();

export const Login = () => {
  const {state, setState} = useAuth();

  useEffect(() => {
    if (state.firebaseId) {
      // Initial state for testing
      state.ref.set({
        chat1: {
          _id: '1',
          title: 'Family',
          desc: 'My family chat',
          img: 'https://images.seoghoer.dk/s3fs-public/media/article/pri_117278292.jpg',
          msg: [
            {
              _id: state.firebaseId,
              text: 'First encounter',
              createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
              user: {
                _id: '2',
                name: 'Kristian',
              },
            },
            {
              _id: state.firebaseId,
              text: 'Dude',
              createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
              user: {
                _id: '2',
                name: 'Kristian',
              },
            },
            {
              _id: '2',
              text: 'What?!',
              createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
              user: {
                _id: state.firebaseId,
                name: state.googleUser.givenName,
                avatar:
                  state.googleUser.photo ||
                  'https://www.aagaardefterskole.dk/wp-content/uploads/2021/08/Kristian-Houbak-e1628583243389.jpg',
              },
            },
          ],
        },
        chat2: {
          _id: '2',
          title: 'Sally',
          desc: 'Chat with Sally',
          msg: [
            {
              _id: state.firebaseId,
              text: 'Hej med dig',
              createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
              user: {
                _id: '2',
                name: 'Kristian',
              },
            },
            {
              _id: '2',
              text: 'Halløj',
              createdAt: new Date(Date.UTC(2016, 5, 11, 17, 20, 0)),
              user: {
                _id: state.firebaseId,
                name: state.googleUser.givenName,
                avatar:
                  state.googleUser.photo ||
                  'https://www.aagaardefterskole.dk/wp-content/uploads/2021/08/Kristian-Houbak-e1628583243389.jpg',
              },
            },
          ],
        },
      });
    }
  }, [state]);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn(); // returns userInfo object from Google
      const oAuthCred = auth.GoogleAuthProvider.credential(userInfo.idToken); // returns OAuthCredentials from Google
      const userCred = await auth().signInWithCredential(oAuthCred); // returns UserCredentials from Firebase

      const reference = firebase
        .app()
        .database(
          'https://fbchatapp-ceb7d-default-rtdb.europe-west1.firebasedatabase.app/',
        )
        .ref('user/' + userCred.user.uid); // Unique branch in firebase for this user

      const newState = {
        firebaseId: userCred.user.uid,
        ref: reference,
        googleUser: userInfo.user,
        googleOAuthToken: oAuthCred.token,
        firebaseUser: userCred.user,
      };
      setState(newState);
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
