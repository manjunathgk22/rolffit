import {Center, HStack, Text, VStack} from 'native-base';
import React from 'react';
import {windowWidth} from '../../constant/AppConstant';
import NeuView from '../../HOC/NeuView/NeuView';
import RfBold from '../RfBold/RfBold';
import RfText from '../RfText/RfText';

const FutureBookingCard = () => {
  return (
    <NeuView borderRadius={8} width={windowWidth - 60}>
      <VStack>
        <Center>
          <RfText>You have upcoming relaxation in </RfText>
          <RfBold>03:00</RfBold>
        </Center>
      </VStack>
    </NeuView>
  );
};

export default FutureBookingCard;
