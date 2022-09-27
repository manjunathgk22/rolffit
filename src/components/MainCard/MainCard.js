import {Center, HStack, Image, View, VStack} from 'native-base';
import React from 'react';
import {TouchableOpacity} from 'react-native';

import {windowWidth} from '../../constant/AppConstant';
import Colors from '../../constant/Colors';
import NeuButton from '../../HOC/NeuView/NeuButton';
import NeuView from '../../HOC/NeuView/NeuView';
import {openUrl} from '../../utility/AppUtility';
import RfBold from '../RfBold/RfBold';
import RfText from '../RfText/RfText';
import SimpleGradient from '../SimpleGradient/SimpleGradient';

const MainCard = ({item, height = 145, activeOpacity = 0.8, jsx}) => {
  const handleCtaClick = () => {
    switch (item?.cta?.type) {
      case 'api_call':
        break;
      case 'web_link':
        openUrl(item?.cta?.name);
        break;
    }
  };
  return (
    <TouchableOpacity onPress={handleCtaClick} activeOpacity={activeOpacity}>
      <NeuView height={height} borderRadius={8} width={windowWidth - 40}>
        <SimpleGradient
          gradient={item?.ui?.background?.colors || Colors.darkGradient}
          style={{flex: 1, width: '100%', borderRadius: 12}}>
          <Center p={3} flex={1}>
            <HStack flex={1}>
              <View height={'100%'} flex={6}>
                <VStack flex={1}>
                  <RfBold
                    textAlign={'left'}
                    color={item?.ui?.title?.color}
                    mt={item?.ui?.title?.['margin-top']}
                    style={{
                      fontSize: item?.ui?.title?.['font-size'],
                    }}>
                    {item?.ui?.title?.text}
                  </RfBold>
                  <RfText
                    textAlign={'left'}
                    mt={item?.ui?.description?.['margin-top']}
                    lineHeight={item?.ui?.description?.['font-size'] + 5 || 30}
                    color={item?.ui?.description?.color}
                    style={{
                      fontSize: item?.ui?.description?.['font-size'],
                    }}>
                    {item?.ui?.description?.text}
                  </RfText>
                  {item?.ui?.button ? (
                    <HStack
                      position={'absolute'}
                      top={85}
                      left={0}
                      alignSelf={'flex-start'}
                      mt={3}>
                      <View
                        py={2}
                        px={4}
                        borderRadius={8}
                        backgroundColor={
                          item?.ui?.button?.['background-color']
                        }>
                        <RfBold
                          fontSize={item?.ui?.button?.['font-size']}
                          color={item?.ui?.button?.['font-color']}>
                          {item?.ui?.button?.text || 'click'}
                        </RfBold>
                      </View>
                    </HStack>
                  ) : null}
                </VStack>
              </View>
              {item?.ui?.['fallback-icon'] ? (
                <HStack justifyContent={'flex-end'} flex={4}>
                  <Image
                    flex={1}
                    resizeMode="contain"
                    source={{
                      uri: item?.ui?.['fallback-icon'],
                    }}
                  />
                </HStack>
              ) : null}
            </HStack>
            {jsx && jsx()}
          </Center>
        </SimpleGradient>
      </NeuView>
    </TouchableOpacity>
  );
};

export default MainCard;
