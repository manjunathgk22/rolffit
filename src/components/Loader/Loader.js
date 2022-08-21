import {Center, Spinner} from 'native-base';
import React from 'react';
import {Easing} from 'react-native-reanimated';
import Colors from '../../constant/Colors';
import NeuSpinner from '../../HOC/NeuView/NeuSpinner';

function Loader({size = 40}) {
  return (
    <Center flex={1}>
      <NeuSpinner indicatorColor={Colors.blue} size={size} color={Colors.bg} />
    </Center>
  );
}

export default Loader;
