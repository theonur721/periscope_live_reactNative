import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Router from './src/router/Router';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { COLORS } from './src/theme/Colors';
import { Provider } from 'react-redux';
import { store } from './src/store/Store';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.safecontainer} edges={['top']}>
          <NavigationContainer>
            <Router />
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  safecontainer: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
});
