import {Text} from 'native-base';
import React from 'react';
import {Platform} from 'react-native';
import Colors from '../../constant/Colors';

const RfBold = props => {
  return (
    <Text
      color={Colors.dark}
      style={{fontFamily: Platform.OS === 'ios' ? '' : 'Geomanist-Bold'}}
      fontSize={'lg'}
      {...props}>
      {props.children}
    </Text>
  );
};

export default RfBold;
