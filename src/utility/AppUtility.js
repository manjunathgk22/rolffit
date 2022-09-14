import {Toast} from 'native-base';
import {Linking} from 'react-native';
import {getUniqueId} from 'react-native-device-info';
import {callAPIs, sendFCMToken} from '../api/apiRequest';
import RfBold from '../components/RfBold/RfBold';
import ToastMessage from '../components/ToastMessage/ToastMessage';
import {FCM_TOKEN, LOGIN_DATA} from '../constant/AppConstant';
import {getData} from './StorageUtility';

export const printLog = (text, ...rest) => {
  console.log(text, ...rest);
  if (__DEV__) {
    // reactotron.log(text, ...rest);
  }
};

export const getToken = async () => {
  const res = await getData({key: LOGIN_DATA});
  if (res) {
    return res.token;
  }
};

export function tConvert(time) {
  if (!time) return;
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time = time.slice(0, time.length - 1);
    time[5] = +time[0] < 12 ? ` AM` : ` PM`; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(''); // return adjusted time or original string
}

export function isObjectEmpty(obj) {
  for (const _i in obj) return false;
  return true;
}

export const sendFCMTokenHelper = async () => {
  const token = await getData({key: FCM_TOKEN});
  const device_id = getUniqueId();
  let json = {
    device_id: device_id,
    fcm_registration_id: typeof token === 'string' ? token : token?.token,
  };

  const res = await getData({key: LOGIN_DATA});
  console.log('qqqqqq', token);
  if (res) {
    json.user_id = res?.user?.id;
  }
  callAPIs(sendFCMToken(json));
};

export const showToast = ({
  text,
  duration = 4000,
  showButton = false,
  buttonText = 'Okay',
  type = 'error',
}) => {
  Toast.show({
    text,
    description: text,
    type,
    duration,
    ...(showButton ? {buttonText} : {}),
  });
};

export const openUrl = url => {
  Linking.openURL(url).catch(_err => {
    showToast({
      text: "Couldn't load page",
    });
  });
};
