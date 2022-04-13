/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {Box, NativeBaseProvider, StatusBar, extendTheme} from 'native-base';
import {Center, HStack, Text, Spacer} from 'native-base';
import Appnavigator from './src/Appnavigator';
const App = () => {
  return (
    <NativeBaseProvider>
      <StatusBar
        translucent={true}
        animated={true}
        backgroundColor={'transparent'}
        barStyle="light-content"
        hidden={false}
      />
      <Appnavigator />
    </NativeBaseProvider>
  );
};

export default App;
