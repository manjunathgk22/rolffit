import reactotron from 'reactotron-react-native';
import {LOGIN_DATA} from '../constant/AppConstant';
import {getData} from './StorageUtility';

export const printLog = (text, ...rest) => {
  if (__DEV__) {
    console.log(text, ...rest);
    reactotron.log(text, ...rest);
  }
};

export const getToken = async () => {
  const res = await getData({key: LOGIN_DATA});
  if (res) {
    return res.token;
  }
};
