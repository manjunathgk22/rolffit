import {View} from 'native-base';
import React from 'react';
import {windowWidth} from '../../constant/AppConstant';
import Colors from '../../constant/Colors';
import NeuView from '../../HOC/NeuView/NeuView';
import RfText from '../RfText/RfText';

const ToastMessage = ({
  viewProps = {},
  textProps = {},
  text,
  width = windowWidth - 20,
}) => {
  return (
    <View
      px={4}
      py={2}
      background={Colors.bg_dark}
      maxWidth={width}
      borderRadius={12}
      {...viewProps}>
      <RfText color={'rf.error'} {...textProps}>
        {text}
      </RfText>
    </View>
  );
};

export default ToastMessage;
