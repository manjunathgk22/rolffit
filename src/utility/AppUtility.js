import reactotron from 'reactotron-react-native';

export const printLog = (text, ...rest) => {
  if (__DEV__) {
    console.log(text, ...rest);
    reactotron.log(text, ...rest);
  }
};
