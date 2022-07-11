import {Center, Spinner} from 'native-base';
import React from 'react';
import Colors from '../../constant/Colors';

function SimpleLoader() {
  return (
    <Center flex={1}>
      <Spinner color={Colors.dark} />
    </Center>
  );
}

export default SimpleLoader;
