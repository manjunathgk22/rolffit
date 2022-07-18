import {Center, HStack, Icon, Image, Text, View, VStack} from 'native-base';
import React from 'react';
import {StyleSheet} from 'react-native';
import NeuButton from '../../HOC/NeuView/NeuButton';
import {constainerStyle} from '../../utility/Styles';
import {AntDesign} from '@native-base/icons';
import Colors from '../../constant/Colors';
import RfBold from '../../components/RfBold/RfBold';
import RfText from '../../components/RfText/RfText';
import routes from '../../Navigator/routes';
import LottieView from 'lottie-react-native';
import {tConvert} from '../../utility/AppUtility';

const BookedScreen = ({
  navigation,
  route: {
    params: {selectedSlot},
  },
}) => {
  return (
    <Center flex={1}>
      {/* <Image
        resizeMode={'contain'}
        style={{width: 200, height: 200}}
        source={require('../../assets/images/relax.png')}
        alt="logo"
      /> */}
      <LottieView
        style={{height: 200, width: '100%'}}
        autoPlay
        loop
        source={require('../../assets/lottie/relax.json')}
      />
      <RfBold mt={8} fontSize="2xl">
        Congratulation
      </RfBold>
      <HStack mt={6}>
        <RfText>You have booked a session at {` `}</RfText>
        <RfBold>{tConvert(selectedSlot.slot.start_time)}</RfBold>
      </HStack>
      <VStack mt={8}>
        <NeuButton
          onPress={() => navigation.navigate(routes.HomeScreen)}
          convex={true}
          customGradient={Colors.gradient}
          height={38}
          width={150}
          borderRadius={8}>
          <RfBold color={Colors.white}>Continue</RfBold>
        </NeuButton>
      </VStack>
    </Center>
  );
};

export default BookedScreen;

const styles = StyleSheet.create({
  container: {
    ...constainerStyle,
    justifyContent: 'flex-start',
  },
});
