/* eslint-disable react-native/no-inline-styles */
import {HStack, Text, View, VStack} from 'native-base';
import React from 'react';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {windowHeight} from '../../constant/AppConstant';
import NeuButton from '../../HOC/NeuView/NeuButton';
import RfText from '../RfText/RfText';

const Slots = () => {
  return (
    <View style={{height: windowHeight - 300}}>
      <ScrollView contentContainerStyle={{flexGrow: 0}}>
        <VStack>
          <HStack mt={6} flexWrap={'wrap'} justifyContent={'flex-start'}>
            {dummySlots.map((slot, i) => (
              <NeuButton
                key={i}
                width={100}
                borderRadius={8}
                height={50}
                style={{
                  marginBottom: 10,
                  marginRight: (i + 1) % 3 === 0 ? 0 : 10,
                }}>
                <RfText> {slot.time}</RfText>
              </NeuButton>
            ))}
          </HStack>
        </VStack>
      </ScrollView>
    </View>
  );
};

export default Slots;

const dummySlots = [
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
];
