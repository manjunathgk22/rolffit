import {HStack, Text} from 'native-base';
import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import NeuButton from '../../HOC/NeuView/NeuButton';
import NeuView from '../../HOC/NeuView/NeuView';
import {printLog} from '../../utility/AppUtility';
import RfBold from '../RfBold/RfBold';

const Tabs = () => {
  const [tabSelect, settabSelect] = useState(1);
  return (
    <NeuView width={350} height={50} borderRadius={8}>
      <HStack>
        {tabSelect === 1 ? (
          <NeuButton active height={30} width={150}>
            <RfBold>Today</RfBold>
          </NeuButton>
        ) : (
          <TouchableOpacity
            onPress={() => {
              settabSelect(1);
            }}>
            <RfBold width={150} textAlign="center">
              Today
            </RfBold>
          </TouchableOpacity>
        )}
        {tabSelect === 2 ? (
          <NeuButton active height={30} width={150}>
            <RfBold>Tomorrow</RfBold>
          </NeuButton>
        ) : (
          <TouchableOpacity
            onPress={() => {
              settabSelect(2);
            }}>
            <RfBold width={150} textAlign="center">
              Tomorrow
            </RfBold>
          </TouchableOpacity>
        )}
      </HStack>
    </NeuView>
  );
};

export default Tabs;
