/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import {Center, HStack, Icon, Image, Text, View, VStack} from 'native-base';
import React from 'react';
import RfBold from '../../../../components/RfBold/RfBold';
import {windowWidth} from '../../../../constant/AppConstant';
import NeuView from '../../../../HOC/NeuView/NeuView';
import {tConvert} from '../../../../utility/AppUtility';
import LottieView from 'lottie-react-native';
import {StyleSheet, TouchableOpacity} from 'react-native';
import RfText from '../../../../components/RfText/RfText';
import {Feather} from '@native-base/icons';
import Colors from '../../../../constant/Colors';

const BookingCard = ({booking, index, handleRating}) => {
  return (
    <Center mt={4} width={windowWidth}>
      <NeuView
        height={booking.show_nps ? 135 : 85}
        width={windowWidth - 40}
        borderRadius={8}>
        <VStack height={'100%'} py={4}>
          <HStack width={windowWidth - 80}>
            <View
              justifyItems={'flex-start'}
              alignItems={'center'}
              flexDirection={'row'}
              width={windowWidth - 120}>
              <NeuView borderRadius={12} inset height={40} width={40}>
                <Icon name="credit-card" as={Feather} color={Colors.primary} />
              </NeuView>
              <VStack ml={4}>
                <RfText>
                  {moment(booking.slot_session.date, 'YYYY-MM-DD').format(
                    'Do MMM',
                  )}
                </RfText>
                <RfBold mt={-1}>
                  {tConvert(booking.slot_session.slot.start_time)}
                  {' - '}
                  {tConvert(booking.slot_session.slot.end_time)}
                </RfBold>
              </VStack>
            </View>
            {booking?.rating_and_reviews?.rating ? (
              <Image
                mt={2}
                style={styles.icon}
                source={starMapping[booking?.rating_and_reviews?.rating]?.url}
              />
            ) : null}
          </HStack>
          {booking.show_nps ? (
            <HStack mt={2} flex={1} justifyContent={'space-around'}>
              {nps.reverse().map(smiley => (
                <TouchableOpacity
                  onPress={() => {
                    handleRating(booking, smiley.star);
                  }}>
                  <VStack alignItems={'center'}>
                    <Image style={styles.icon} source={smiley.url} />
                    {/* <RfText>{smiley.text}</RfText> */}
                  </VStack>
                </TouchableOpacity>
              ))}
            </HStack>
          ) : null}
          <View position={'absolute'} right={0} top={1}>
            <RfBold fontSize={14} color={Colors.white}>
              {booking.status_display}
            </RfBold>
          </View>
        </VStack>
      </NeuView>
    </Center>
  );
};

export default BookingCard;

const styles = StyleSheet.create({
  icon: {
    width: 44,
    height: 44,
  },
});

const nps = [
  {
    url: require('../../../../assets/images/star.png'),
    star: 5,
    text: 'Loved it!',
  },
  {
    url: require('../../../../assets/images/hello.png'),
    star: 4,
  },
  {
    url: require('../../../../assets/images/mask.png'),
    star: 3,
  },
  {
    url: require('../../../../assets/images/bored.png'),
    star: 2,
  },
  {
    url: require('../../../../assets/images/pain.png'),
    star: 1,
  },
];
const starMapping = {
  5: {
    url: require('../../../../assets/images/star.png'),
    star: 5,
  },
  4: {
    url: require('../../../../assets/images/hello.png'),
    star: 4,
  },
  3: {
    url: require('../../../../assets/images/mask.png'),

    star: 3,
  },
  2: {
    url: require('../../../../assets/images/bored.png'),
    star: 2,
  },
  1: {
    url: require('../../../../assets/images/pain.png'),
    star: 1,
  },
};
