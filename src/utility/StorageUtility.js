import AsyncStorage from '@react-native-async-storage/async-storage';
import {printLog} from './AppUtility';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
export const storeData = async ({value, key}) => {
  try {
    const jsonValue = JSON.stringify(value);
    console.log('dynamiclinnk555', jsonValue);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
    printLog('error storage dynamiclinnk55511', e);
  }
};
export const getData = async ({key}) => {
  try {
    console.log('dynamiclinnk66611', key);
    const jsonValue = await AsyncStorage.getItem(key);
    console.log(
      'dynamiclinnk666622',
      jsonValue !== null ? JSON.parse(jsonValue) : null,
    );

    return jsonValue !== null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    printLog('error storage dynamiclinnk55522', e);
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
  global.userData = null;
};

export const removeSingleData = async ({key}) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // error reading value
    printLog('error storage', e);
  }
};
