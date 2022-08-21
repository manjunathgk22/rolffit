import {Center, HStack, Text, View, VStack} from 'native-base';
import React, {useContext, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {windowWidth} from '../../constant/AppConstant';
import NeuBorderView from '../../HOC/NeuView/NeuBorderView';
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
    <View
      justifyContent={'center'}
      alignItems={'center'}
      width={windowWidth - 40}
      height={60}
      borderRadius={8}>
      <NeuBorderView borderWidth={0} borderRadius={12} height={50} width={320}>
        <HStack>
          {tabSelect === 1 ? (
            <NeuButton height={50} width={TOMORROW?.slot_sessions ? 160 : 315}>
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
                <Center width={TOMORROW?.slot_sessions ? 160 : 315} mt={2}>
                  <RfText
                    style={{fontFamily: 'Comfortaa-Bold'}}
                    textAlign="center">
                    {TODAY.title}
                  </RfText>
                  {TODAY.sub_title ? (
                    <RfText
                      fontSize="xs"
                      style={{fontFamily: 'Comfortaa-Bold'}}
                      textAlign="center">
                      {TODAY.sub_title}
                    </RfText>
                  ) : null}
                </Center>
              </VStack>
            </TouchableOpacity>
          )}
          {TOMORROW?.slot_sessions ? (
            <>
              {tabSelect === 2 ? (
                <NeuButton height={50} width={160}>
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
                    <Center width={160} mt={2}>
                      <RfText
                        style={{fontFamily: 'Comfortaa-Bold'}}
                        textAlign="center">
                        {TOMORROW.title}
                      </RfText>
                      {TOMORROW.sub_title ? (
                        <RfText
                          fontSize="xs"
                          style={{fontFamily: 'Comfortaa-Bold'}}
                          textAlign="center">
                          {TOMORROW.sub_title}
                        </RfText>
                      ) : null}
                    </Center>
                  </VStack>
                </TouchableOpacity>
              )}
            </>
          ) : null}
        </HStack>
      </NeuBorderView>
    </View>
  );
};

export default Tabs;
