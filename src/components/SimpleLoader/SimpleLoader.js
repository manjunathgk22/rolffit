import {Center, Spinner} from 'native-base';
import React from 'react';
import Colors from '../../constant/Colors';

function SimpleLoader({color = Colors.dark}) {
  return (
    <Center flex={1}>
      <Spinner color={color} />
    </Center>
  );
}

export default SimpleLoader;
