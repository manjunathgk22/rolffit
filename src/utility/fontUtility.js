import {Platform} from 'react-native';

export const getComfortaaRegular = () => {
  return Platform.OS === 'ios' ? 'Comfortaa' : 'Comfortaa-Regular';
};

export const getComfortaaBold = () => {
  return 'Comfortaa-Bold';
};

export const getGeomanistbold = () => {
  return 'Geomanist-Bold';
};

export const getGeomanistRegular = () => {
  return 'Geomanist-Regular';
};
