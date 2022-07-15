import {Center, HStack, Text, VStack} from 'native-base';
import React from 'react';
import {windowWidth} from '../../constant/AppConstant';
import NeuView from '../../HOC/NeuView/NeuView';
import RfBold from '../RfBold/RfBold';
import RfText from '../RfText/RfText';

const FutureBookingCard = ({time}) => {
  return (
    <NeuView borderRadius={8} width={windowWidth - 40}>
      <VStack>
        <Center>
          <RfText>You have upcoming relaxation in </RfText>
          <RfBold>{time}</RfBold>
        </Center>
      </VStack>
    </NeuView>
  );
};

export default FutureBookingCard;
