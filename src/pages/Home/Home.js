/* eslint-disable react-native/no-inline-styles */
import {Center, HStack, Icon, VStack} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../../ContextApi/GlobalContextProvider';
import Colors from '../../constant/Colors';
import HomeProvider, {HomeContext} from './ContextApi/HomeProvider';
import FutureBookingCard from '../../components/FutureBookingCard/FutureBookingCard';
import {SimpleLineIcons} from '@native-base/icons';
import NeuButton from '../../HOC/NeuView/NeuButton';
import Tabs from '../../components/Tabs/Tabs';
import Slots from '../../components/Slots/Slots';
import NavigationService from '../../Navigator/NavigationService';
import routes from '../../Navigator/routes';

function HomeScreen() {
  const {globalStore, globalDispatch} = useContext(GlobalContext);
  const {homeStore, homeDispatch} = useContext(HomeContext);

  return (
    <VStack p={4} flex={1} backgroundColor={Colors.bg}>
      <HStack>
        <NeuButton
          onPress={() => {
            NavigationService.navigate(routes.Options);
          }}
          height={40}
          width={40}
          borderRadius={50}>
          <Icon as={SimpleLineIcons} name="menu" color={Colors.dark} />
        </NeuButton>
      </HStack>
      <Center p={4} mt={4}>
        <FutureBookingCard />
        <VStack mt={6}>
          <Tabs />
          <Slots />
        </VStack>
      </Center>
    </VStack>
  );
}

const WrappedHomeScreen = props => (
  <HomeProvider>
    <HomeScreen {...props} />
  </HomeProvider>
);
export default WrappedHomeScreen;
