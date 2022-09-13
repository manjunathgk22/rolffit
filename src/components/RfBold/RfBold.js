import {Text} from 'native-base';
import React from 'react';
import {Platform} from 'react-native';
import Colors from '../../constant/Colors';
import {getGeomanistbold} from '../../utility/fontUtility';

const RfBold = props => {
  return (
    <Text
      color={Colors.dark}
      style={{
        fontFamily: getGeomanistbold(),
      }}
      {...(Platform.OS === 'ios' ? {fontWeight: '700'} : {})}
      fontSize={'lg'}
      {...props}>
      {props.children}
    </Text>
  );
};

export default RfBold;
