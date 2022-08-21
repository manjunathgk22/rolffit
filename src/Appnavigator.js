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
import dynamicLinks from '@react-native-firebase/dynamic-links';
import {storeData} from './utility/StorageUtility';
import {URL, URLSearchParams} from 'react-native-url-polyfill';
import {BUSINESS_PARTNER_ID} from './constant/AppConstant';

const Stack = createNativeStackNavigator();

function Appnavigator() {
  const {globalStore, globalDispatch} = useContext(GlobalContext);

  const handleDeeplink = async link => {
    if (link) {
      console.log('dynamiclinnk', link);
      if (link.url) {
        const url = new URL(link.url);
        const urlParams = new URLSearchParams(url.search);
        console.log('dynamiclinnk2323', link.url);
        try {
          const businessPartner = urlParams.get('unique_code');
          console.log('dynamiclinnk333', businessPartner);
          await storeData({key: BUSINESS_PARTNER_ID, value: businessPartner});
        } catch (error) {
          console.log('dynamiclinnk333444', error);
        }
      }
      // handleDeepLinknavigation(link.url);
    }
  };

  useEffect(() => {
    dynamicLinks().onLink(async link => {
      handleDeeplink(link);
    });
    dynamicLinks()
      .getInitialLink()
      .then(async link => {
        console.log('dynamiclinnk2', link);
        await handleDeeplink(link);
      });
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer
        ref={ref => {
          navigationRef.current = ref;
        }}>
        <Stack.Navigator
          initialRouteName={
            globalStore.loginData ? routes.HomeScreen : routes.Signin
          }>
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
