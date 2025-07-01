import * as Font from 'expo-font';
import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import colors from './shared/constants/colors';
import Menu from './components/Menu';
import { NavigationContainer } from '@react-navigation/native';
export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Montserrat-Regular': require('./assets/fonts/Montserrat-Regular.ttf'),
        'Montserrat-Bold': require('./assets/fonts/Montserrat-Bold.ttf'),
        'Montserrat-Light': require('./assets/fonts/Montserrat-Light.ttf'),
        'Montserrat-SemiBold': require('./assets/fonts/Montserrat-SemiBold.ttf'),
        'Montserrat-Black': require('./assets/fonts/Montserrat-Black.ttf'),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // o uno splash temporaneo
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container_safeArea} edges={['top']}>
        <NavigationContainer>
          <Menu/>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container_safeArea: {
    backgroundColor: colors.background,
    flex: 1,
  },
})
