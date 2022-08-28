import {Text} from 'native-base';
import React from 'react';

function RfText(props) {
  return (
    <Text
      color={'rf.dark'}
      letterSpacing={1}
      fontSize={'md'}
      // style={{fontFamily: 'Comfortaa-Regular'}}
      fontWeight={'normal'}
      {...props}>
      {props.children}
    </Text>
  );
}

export default RfText;
