import {Text} from 'native-base';
import React from 'react';
import {Platform} from 'react-native';

function RfText(props) {
  return (
    <Text
      color={'rf.dark'}
      letterSpacing={1}
      fontSize={'md'}
      // style={{fontFamily: 'Comfortaa-Regular'}}
      style={{fontFamily: Platform.OS === 'ios' ? '' : 'Comfortaa-Regular'}}
      fontWeight={'normal'}
      {...props}>
      {props.children}
    </Text>
  );
}

export default RfText;
