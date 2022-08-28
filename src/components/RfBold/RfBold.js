import {Text} from 'native-base';
import React from 'react';
import Colors from '../../constant/Colors';

const RfBold = props => {
  return (
    <Text
      color={Colors.dark}
      // style={{fontFamily: 'Geomanist-Bold'}}
      fontSize={'lg'}
      {...props}>
      {props.children}
    </Text>
  );
};

export default RfBold;
