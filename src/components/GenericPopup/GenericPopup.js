import {Actionsheet, HStack, VStack} from 'native-base';
import React from 'react';
import {windowWidth} from '../../constant/AppConstant';
import NeuButton from '../../HOC/NeuView/NeuButton';
import NeuView from '../../HOC/NeuView/NeuView';
import RfBold from '../RfBold/RfBold';
import RfText from '../RfText/RfText';

const GenericPopup = ({
  onClose,
  onSelect,
  title,
  primaryBtn,
  secondaryBtn = 'cancel',
  space = 3,
}) => {
  return (
    <Actionsheet hideDragIndicator isOpen={true} onClose={onClose}>
      <Actionsheet.Content padding={0}>
        <NeuView height={300} width={windowWidth}>
          <VStack my={8}>
            <RfBold>{title}</RfBold>
            <HStack mt={8} space={space} justifyContent={'space-around'}>
              <NeuButton onPress={onClose} height={50}>
                <RfText>{secondaryBtn}</RfText>
              </NeuButton>
              <NeuButton onPress={onSelect} height={50}>
                <RfBold>{primaryBtn}</RfBold>
              </NeuButton>
            </HStack>
          </VStack>
        </NeuView>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default GenericPopup;
