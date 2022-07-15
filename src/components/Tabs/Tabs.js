import {Center, HStack, Text, VStack} from 'native-base';
import React, {useContext, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import NeuButton from '../../HOC/NeuView/NeuButton';
import NeuView from '../../HOC/NeuView/NeuView';
import {HomeContext} from '../../pages/Home/ContextApi/HomeProvider';
import {printLog} from '../../utility/AppUtility';
import RfBold from '../RfBold/RfBold';
import RfText from '../RfText/RfText';

const Tabs = ({tabSelect, settabSelect}) => {
  const {
    homeStore: {
      slotsData: {
        data: {TODAY = {}, TOMORROW = {}},
      },
    },
    homeDispatch,
  } = useContext(HomeContext);
  return (
    <NeuView width={350} height={60} borderRadius={8}>
      <HStack>
        {tabSelect === 1 ? (
          <NeuButton active height={45} width={150}>
            <VStack>
              <Center>
                <RfBold>{TODAY.title}</RfBold>
                {TODAY.sub_title ? (
                  <RfBold fontSize="xs">{TODAY.sub_title}</RfBold>
                ) : null}
              </Center>
            </VStack>
          </NeuButton>
        ) : (
          <TouchableOpacity
            onPress={() => {
              settabSelect(1);
            }}>
            <VStack>
              <Center>
                <RfText
                  style={{fontFamily: 'Comfortaa-Bold'}}
                  width={150}
                  textAlign="center">
                  {TODAY.title}
                </RfText>
                {TODAY.sub_title ? (
                  <RfText
                    style={{fontFamily: 'Comfortaa-Bold'}}
                    width={150}
                    textAlign="center">
                    {TODAY.sub_title}
                  </RfText>
                ) : null}
              </Center>
            </VStack>
          </TouchableOpacity>
        )}
        {tabSelect === 2 ? (
          <NeuButton active height={45} width={150}>
            <VStack>
              <Center>
                <RfBold>{TOMORROW.title}</RfBold>
                {TOMORROW.sub_title ? (
                  <RfBold fontSize="xs">{TOMORROW.sub_title}</RfBold>
                ) : null}
              </Center>
            </VStack>
          </NeuButton>
        ) : (
          <TouchableOpacity
            onPress={() => {
              settabSelect(2);
            }}>
            <VStack>
              <Center>
                <RfText
                  style={{fontFamily: 'Comfortaa-Bold'}}
                  width={150}
                  textAlign="center">
                  {TOMORROW.title}
                </RfText>
                {TOMORROW.sub_title ? (
                  <RfText
                    style={{fontFamily: 'Comfortaa-Bold'}}
                    width={150}
                    textAlign="center">
                    {TOMORROW.sub_title}
                  </RfText>
                ) : null}
              </Center>
            </VStack>
          </TouchableOpacity>
        )}
      </HStack>
    </NeuView>
  );
};

export default Tabs;
