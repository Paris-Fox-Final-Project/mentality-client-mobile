import React, { useEffect } from 'react';
import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

export default function SplashScreen() {
  useEffect(() => {
    SplashScreen.hide()
  }, [])

  return (
    <SafeAreaView>
      <Text>Splash Screen</Text>
    </SafeAreaView>
  )
}
