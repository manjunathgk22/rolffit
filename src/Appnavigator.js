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

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          if (route.name === routes.Booking) {
            if (focused) {
              return (
                <Icon
                  size={'sm'}
                  color="primary.700"
                  as={Entypo}
                  name="calendar"
                />
              );
            } else {
              return <Icon size={'sm'} as={AntDesign} name="calendar" />;
            }
          }
          if (focused) {
            return (
              <Icon
                size={'sm'}
                color="primary.700"
                as={Ionicons}
                name="options"
              />
            );
          } else {
            return <Icon size={'sm'} as={Ionicons} name="options" />;
          }
        },
      })}>
      <Tab.Screen
        name={routes.Booking}
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={routes.Settings}
        component={Options}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
}
const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={() => <Text>qqqq</Text>}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Notifications" component={Options} />
    </Drawer.Navigator>
  );
};

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
