import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Text, View, StyleSheet} from 'react-native';
import React, {useContext, useEffect} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {navigationRef} from './Navigator/NavigationService';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Entypo, Ionicons, AntDesign} from '@native-base/icons';
import {Heading, Icon} from 'native-base';
import Colors from './constant/Colors';
import HomeScreen from './pages/Home/Home';
import {Signin} from './pages/Signin/Signin';
import {GlobalContext} from './ContextApi/GlobalContextProvider';
import {printLog} from './utility/AppUtility';
import Options from './pages/Options/Options';
import routes from './Navigator/routes';
import {createDrawerNavigator} from '@react-navigation/drawer';
import BookedScreen from './pages/BookedScreen/BookedScreen';

const Stack = createNativeStackNavigator();

function Appnavigator() {
  const {globalStore, globalDispatch} = useContext(GlobalContext);
  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={ref => {
          navigationRef.current = ref;
        }}>
        <Stack.Navigator
          initialRouteName={globalStore.loginData ? 'HomeScreen' : 'Signin'}>
          <Stack.Screen
            name={routes.HomeScreen}
            component={HomeScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={routes.Signin}
            component={Signin}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={routes.Options}
            component={Options}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name={routes.BookedScreen}
            component={BookedScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default Appnavigator;

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
