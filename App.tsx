
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { MainNavigator } from './navigator/MainNavigator';



export default function App() {
  return (
    <NavigationContainer>
      <MainNavigator/>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
