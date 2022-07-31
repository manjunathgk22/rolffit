import {Center, HStack, Icon, Image, Text, View, VStack} from 'native-base';
import React from 'react';
import {windowWidth} from '../../constant/AppConstant';
import Colors from '../../constant/Colors';
import NeuView from '../../HOC/NeuView/NeuView';
import RfBold from '../RfBold/RfBold';
import RfText from '../RfText/RfText';
import {AntDesign} from '@native-base/icons';
import GradientText from '../GradientText/GradientText';

const FutureBookingCard = ({time}) => {
  return (
    <NeuView height={180} borderRadius={8} width={windowWidth - 40}>
      <Center>
        <VStack>
          <View
            // background={Colors.error}
            flex={1}
            alignItems={'flex-end'}
            width={windowWidth - 40}>
            <Image
              // background={Colors.darker}
              resizeMode="contain"
              width={220}
              height={120}
              source={require('../../assets/images/upcoming.png')}
            />
            <View width={windowWidth - 40} mt={-3}>
              <Center>
                <NeuView borderRadius={8} height={60} width={windowWidth - 60}>
                  <HStack px={5} alignItems={'center'} flex={1} width={'100%'}>
                    <NeuView height={38} width={38} borderRadius={8}>
                      <Icon
                        as={AntDesign}
                        name="calendar"
                        color={Colors.dark}
                      />
                    </NeuView>
                    <View>
                      <RfText ml={5}>Upcoming relaxation </RfText>
                      <GradientText
                        ml={5}
                        fontWeight={'bold'}
                        fontSize={'lg'}
                        colors={Colors.gradient.reverse()}>
                        {time}
                      </GradientText>
                    </View>
                  </HStack>
                </NeuView>
              </Center>
            </View>
          </View>
        </VStack>
      </Center>
    </NeuView>
  );
};

export default FutureBookingCard;
