/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import {printLog} from './src/utility/AppUtility';
import {getMacAddress} from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {APP_STATE, NOTIFDATA} from './src/constant/AppConstant';
import {NotifHandler} from './src/utility/NotifHandler';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

if (__DEV__) {
  import('./ReactotronConfig');
}

// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  foreground: true,
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: async function (token) {
    printLog('TOKEN:', token);
    let data = null;
    const device_id = await getMacAddress();
    let json = {
      device_id,
      fcm_registration_id: token.token,
    };
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    printLog('NOTIFICATION:', notification);
    // NOTIFDATA = notification;
    if (APP_STATE === 'active' || APP_STATE === 'background') {
      NotifHandler();
    }
    notification.finish(PushNotificationIOS.FetchResult.NoData);

    // process the notification
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    printLog('ACTION:', notification.action);
    printLog('NOTIFICATION:', notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function (err) {
    printLog(err.message, err);
  },

  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: true,
});

AppRegistry.registerComponent(appName, () => App);
