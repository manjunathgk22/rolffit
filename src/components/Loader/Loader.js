import {Center, Spinner} from 'native-base';
import React from 'react';
import {Easing} from 'react-native-reanimated';
import Colors from '../../constant/Colors';
import NeuSpinner from '../../HOC/NeuView/NeuSpinner';

function Loader() {
  return (
    <Center flex={1}>
      <NeuSpinner indicatorColor={Colors.dark} size={40} color={Colors.bg} />
    </Center>
  );
}

export default Loader;
