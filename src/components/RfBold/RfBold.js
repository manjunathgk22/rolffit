import {Text} from 'native-base';
import React from 'react';

const RfBold = props => {
  return (
    <Text
      color={'rf.dark'}
      fontFamily={'geomanist'}
      fontWeight={'semibold'}
      fontSize={'lg'}
      {...props}>
      {props.children}
    </Text>
  );
};

export default RfBold;
