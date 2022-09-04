/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Box, NativeBaseProvider, StatusBar, extendTheme} from 'native-base';
import {Center, HStack, Text, Spacer} from 'native-base';
import Appnavigator from './src/Appnavigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useEffect, useState} from 'react';
import Colors from './src/constant/Colors';
import GlobalProvider from './src/ContextApi/GlobalContextProvider';
import SplashScreen from './src/pages/SplashScreen/SplashScreen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

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

const MyStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, {backgroundColor}]}>
    <SafeAreaView>
      <StatusBar
        translucent={true}
        animated={true}
        backgroundColor={Colors.bg}
        barStyle="light-content"
        hidden={false}
        {...props}
      />
    </SafeAreaView>
  </View>
);

const onRemoteNotification = notification => {
  const isClicked = notification.getData().userInteraction === 1;

  if (isClicked) {
    // Navigate user to another screen
  } else {
    // Do something else with push notification
  }
};

const setNotificationCategories = () => {
  PushNotificationIOS?.setNotificationCategories?.([
    {
      id: 'userAction',
      actions: [
        {id: 'open', title: 'Open', options: {foreground: true}},
        {
          id: 'ignore',
          title: 'Desruptive',
          options: {foreground: true, destructive: true},
        },
        // {
        //   id: 'text',
        //   title: 'Text Input',
        //   options: {foreground: true},
        //   textInput: {buttonTitle: 'Send'},
        // },
      ],
    },
  ]);
};

const App = () => {
  useEffect(() => {
    const type = 'notification';
    if (Platform.OS === 'ios') {
      PushNotificationIOS.addEventListener(type, onRemoteNotification);
      setNotificationCategories();
    }

    return () => {
      if (Platform.OS === 'ios') {
        PushNotificationIOS.removeEventListener(type);
      }
    };
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <NativeBaseProvider theme={theme}>
        <GlobalProvider>
          <StatusBar
            translucent={true}
            animated={true}
            backgroundColor={Colors.bg}
            barStyle="light-content"
            hidden={false}
          />
          <SplashScreen />
        </GlobalProvider>
      </NativeBaseProvider>
    </SafeAreaView>
    // <View style={styles.container}>
    //   {Platform.OS === 'ios' ? (
    //     <MyStatusBar backgroundColor={Colors.bg} barStyle="light-content" />
    //   ) : null}
    //   <View style={styles.appBar} />
    //   <View style={styles.content}>
    //     <NativeBaseProvider theme={theme}>
    //       <GlobalProvider>
    //         <StatusBar
    //           translucent={true}
    //           animated={true}
    //           backgroundColor={Colors.bg}
    //           barStyle="light-content"
    //           hidden={false}
    //         />
    //         <SplashScreen />
    //       </GlobalProvider>
    //     </NativeBaseProvider>
    //   </View>
    // </View>
  );
};

export default App;

const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 25;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: Colors.bg,
    height: APPBAR_HEIGHT,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
});
