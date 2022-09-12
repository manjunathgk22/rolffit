import React from 'react';
import NeuView from '../../HOC/NeuView/NeuView';
import RfText from '../RfText/RfText';

const ToastMessage = ({viewProps = {}, textProps = {}, text, width = 220}) => {
  debugger;
  return (
    <NeuView height={50} width={width} borderRadius={40} {...viewProps}>
      <RfText color={'rf.error'} {...textProps}>
        {text}
      </RfText>
    </NeuView>
  );
};

export default ToastMessage;
