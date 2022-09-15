import {Dimensions} from 'react-native';

export let NOTIFDATA = null;
export const APP_STATE = '';
export const LOGIN_DATA = 'LOGIN_DATA';
export const BUSINESS_PARTNER_ID = 'businessPartner';
export const FCM_TOKEN = 'FCM_TOKEN';
export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

export const setNotifData = val => {
  NOTIFDATA = val;
};

export const miscData = {};
