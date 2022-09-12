import {Center, Spinner} from 'native-base';
import React from 'react';
import {Easing} from 'react-native-reanimated';
import Colors from '../../constant/Colors';
import NeuSpinner from '../../HOC/NeuView/NeuSpinner';

function Loader({size = 40, indicatorColor = Colors.blue}) {
  return (
    <Center flex={1}>
      <NeuSpinner
        indicatorColor={indicatorColor}
        size={size}
        color={Colors.bg}
      />
    </Center>
  );
}

export default Loader;
