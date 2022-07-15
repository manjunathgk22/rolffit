/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import {Center, HStack, Text, View, VStack} from 'native-base';
import React from 'react';
import RfBold from '../../../../components/RfBold/RfBold';
import {windowWidth} from '../../../../constant/AppConstant';
import NeuView from '../../../../HOC/NeuView/NeuView';
import {tConvert} from '../../../../utility/AppUtility';
import LottieView from 'lottie-react-native';

const nps = [
  {
    url: require('../../../../assets/lottie/awesome.json'),
    star: 5,
  },
  {
    url: require('../../../../assets/lottie/happy.json'),
    star: 4,
  },
  {
    url: require('../../../../assets/lottie/neutral.json'),
    star: 3,
  },
  {
    url: require('../../../../assets/lottie/meh.json'),
    star: 2,
  },
  {
    url: require('../../../../assets/lottie/sad.json'),
    star: 1,
  },
];
const BookingCard = ({booking}) => {
  return (
    <Center mt={4} width={windowWidth}>
      <NeuView width={windowWidth - 40} borderRadius={8}>
        <VStack>
          <Center>
            <Text>
              {moment(booking.slot_session.date, 'yyyy-mm-dd').format('DD MMM')}
            </Text>
            <RfBold>{tConvert(booking.slot_session.slot.start_time)}</RfBold>
            <HStack width={'100%'}>
              {nps.map(smiley => (
                <LottieView
                  style={{height: 40, width: 40, marginLeft: 10}}
                  autoPlay
                  loop
                  source={smiley.url}
                />
              ))}
            </HStack>
          </Center>
        </VStack>
      </NeuView>
    </Center>
  );
};

export default BookingCard;
