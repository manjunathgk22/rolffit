import {Text} from 'native-base';
import React from 'react';

const RfBold = props => {
  return (
    <Text
      color={'#000'}
      style={{fontFamily: 'Geomanist-Bold'}}
      fontSize={'lg'}
      {...props}>
      {props.children}
    </Text>
  );
};

export default RfBold;
