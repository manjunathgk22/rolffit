/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment} from 'react';
import {StyleSheet} from 'react-native';
import {Box, NativeBaseProvider, StatusBar, extendTheme} from 'native-base';
import {Center, HStack, Text, Spacer} from 'native-base';
import Appnavigator from './src/Appnavigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useEffect, useState} from 'react';
import Colors from './src/constant/Colors';
import GlobalProvider from './src/ContextApi/GlobalContextProvider';
import SplashScreen from './src/pages/SplashScreen/SplashScreen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const theme = extendTheme({
  colors: {
    rf: {
      dark: Colors.dark,
      bg: Colors.bg,
      error: '#e3324a',
    },
  },
  fontConfig: {
    geomanist: {
      400: {
        normal: 'Geomanist-Regular',
      },
      600: {
        normal: 'Geomanist-Medium',
      },
      700: {
        normal: 'Geomanist-Bold',
      },
    },
    comfortaa: {
      300: {
        normal: 'Comfortaa-Thin',
      },
      400: {
        normal: 'Comfortaa-Regular',
      },
      600: {
        normal: 'Comfortaa-Bold',
      },
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    geomanist: 'geomanist',
    comfortaa: 'comfortaa',
  },
});
GoogleSignin.configure({
  // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  webClientId:
    '982846620366-ruah2ibtqp8d33ontrt0qai4q4ju1av1.apps.googleusercontent.com',
});
const App = () => {
  useEffect(() => {}, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <NativeBaseProvider theme={theme}>
        <GlobalProvider>
          <StatusBar
            translucent={true}
            animated={true}
            backgroundColor={Colors.bg}
            barStyle="dark-content"
            hidden={false}
          />
          <SplashScreen />
        </GlobalProvider>
      </NativeBaseProvider>
    </SafeAreaView>
  );
};

export default App;
