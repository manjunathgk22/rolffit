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
const BookedScreen = ({navigation}) => {
  return (
    <Center flex={1}>
      <Image
        resizeMode={'contain'}
        style={{width: 200, height: 200}}
        source={require('../../assets/images/relax.png')}
        alt="logo"
      />
      <RfBold mt={8} fontSize="2xl">
        Congratulation
      </RfBold>
      <RfText>Lorem epsum lorem Epsum</RfText>
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
