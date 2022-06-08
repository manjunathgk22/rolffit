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
import {Box, NativeBaseProvider, StatusBar, Image, View} from 'native-base';
import {Center, HStack, Text, Spacer} from 'native-base';
import Appnavigator from './src/Appnavigator';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useEffect, useState} from 'react';
import Colors from './src/constant/Colors';
const App = () => {
  const [render, setrender] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setrender(true);
    }, 4000);
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <NativeBaseProvider>
        <StatusBar
          translucent={true}
          animated={true}
          backgroundColor={Colors.dark}
          barStyle="light-content"
          hidden={false}
        />
        {!render ? (
          <View style={styles.colCenter}>
            <Image
              resizeMode={'contain'}
              style={{width: 300, height: 300}}
              source={require('./src/assets/images/logo_animation_black.gif')}
              alt="logo"
            />
          </View>
        ) : (
          <Fragment>
            <Appnavigator />
          </Fragment>
        )}
      </NativeBaseProvider>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  colCenter: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: Colors.white,
  },
});
