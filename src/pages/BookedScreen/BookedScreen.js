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
import NeuView from '../../HOC/NeuView/NeuView';
import {windowWidth} from '../../constant/AppConstant';

const BookedScreen = ({navigation, route: {params}}) => {
  const {selectedSlot} = params || {};
  return (
    <Center background={Colors.bg} flex={1}>
      {/* <Image
        resizeMode={'contain'}
        style={{width: 200, height: 200}}
        source={require('../../assets/images/relax.png')}
        alt="logo"
      /> */}
      <NeuView borderRadius={12} width={windowWidth - 40} height={440}>
        <Image
          resizeMode="contain"
          height={180}
          source={require('../../assets/images/booked.png')}
        />
        <RfBold mt={4} fontSize="3xl">
          Congratulation
        </RfBold>
        <HStack
          maxWidth={windowWidth - 40}
          flexWrap={'wrap'}
          justifyContent={'center'}
          textAlign="center"
          mt={2}>
          <RfText>You have booked a session at </RfText>
          <RfBold>{tConvert(selectedSlot?.slot.start_time)}</RfBold>
        </HStack>
        <VStack mt={8}>
          <NeuButton
            onPress={() => navigation.navigate(routes.HomeScreen)}
            convex={true}
            customGradient={Colors.gradient}
            height={40}
            width={180}
            borderRadius={8}>
            <RfBold color={Colors.white}>Continue</RfBold>
          </NeuButton>
        </VStack>
      </NeuView>
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
