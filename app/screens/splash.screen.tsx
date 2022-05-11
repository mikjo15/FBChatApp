import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  Button,
} from 'react-native';
import {sharedStyles} from '../assets/styles/shared.styles';

export const SplashScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.txtTitle}>ChatApp</Text>
        <Image source={require('../assets/img/sdu.png')} style={styles.img} />
        <Text style={styles.txtSub}>By Mikkel Skræddergaard</Text>
        <ActivityIndicator style={styles.actInd} size="large" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtTitle: {
    textAlign: 'center',
    fontSize: 35,
    marginBottom: 20,
    ...sharedStyles.fontRoboto,
  },
  txtSub: {
    textAlign: 'center',
    fontSize: 10,
    marginTop: 20,
    ...sharedStyles.fontRoboto,
  },
  img: {
    resizeMode: 'contain',
    height: 100,
    width: 200,
  },
  actInd: {
    marginTop: 50,
  },
});
