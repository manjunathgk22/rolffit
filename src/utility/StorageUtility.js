import AsyncStorage from '@react-native-async-storage/async-storage';
import {printLog} from './AppUtility';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
export const storeData = async ({value, key}) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
    printLog('error storage', e);
  }
};
export const getData = async ({key}) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    printLog('error storage', e);
  }
};

export const removeData = async ({key}) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // error reading value
    printLog('error storage', e);
  }
  await GoogleSignin.signOut();
};
