import {Text} from 'native-base';
import React from 'react';
import NeuView from '../../HOC/NeuView/NeuView';

const Card = props => {
  return (
    <NeuView borderRadius={8} {...props}>
      <Text>asjkdnkajsd</Text>
    </NeuView>
  );
};

export default Card;
