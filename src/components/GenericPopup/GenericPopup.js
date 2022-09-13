import {Actionsheet, HStack, VStack} from 'native-base';
import React from 'react';
import {windowWidth} from '../../constant/AppConstant';
import Colors from '../../constant/Colors';
import NeuButton from '../../HOC/NeuView/NeuButton';
import NeuView from '../../HOC/NeuView/NeuView';
import RfBold from '../RfBold/RfBold';
import RfText from '../RfText/RfText';

const GenericPopup = ({
  onClose,
  onPrimaryBtnClick,
  onSecondaryBtnClick,
  title,
  primaryBtn,
  primaryBtnWidth = 100,
  secondaryBtn,
  space = 3,
  height = 300,
  body,
  hideDragIndicator = true,
}) => {
  return (
    <Actionsheet
      hideDragIndicator={hideDragIndicator}
      isOpen={true}
      onClose={onClose}>
      <Actionsheet.Content background={Colors.bg} padding={0}>
        <NeuView height={height} width={windowWidth}>
          <VStack my={8}>
            <RfBold>{title}</RfBold>
            {body ? body() : null}
            <HStack mt={8} space={space} justifyContent={'center'}>
              {secondaryBtn && (
                <NeuButton onPress={onSecondaryBtnClick} height={50}>
                  <RfText>{secondaryBtn}</RfText>
                </NeuButton>
              )}

              {primaryBtn && (
                <NeuButton
                  width={primaryBtnWidth}
                  onPress={onPrimaryBtnClick}
                  height={50}>
                  <RfBold>{primaryBtn}</RfBold>
                </NeuButton>
              )}
            </HStack>
          </VStack>
        </NeuView>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default GenericPopup;
