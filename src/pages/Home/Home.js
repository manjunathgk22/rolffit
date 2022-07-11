/* eslint-disable react-native/no-inline-styles */
import {Center, HStack, Icon, useToast, VStack} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../../ContextApi/GlobalContextProvider';
import Colors from '../../constant/Colors';
import FutureBookingCard from '../../components/FutureBookingCard/FutureBookingCard';
import {SimpleLineIcons} from '@native-base/icons';
import NeuButton from '../../HOC/NeuView/NeuButton';
import Tabs from '../../components/Tabs/Tabs';
import Slots from '../../components/Slots/Slots';
import NavigationService from '../../Navigator/NavigationService';
import routes from '../../Navigator/routes';
import Loader from '../../components/Loader/Loader';
import {WebView} from 'react-native-webview';
import {
  getSlots,
  getSlotsFailure,
  getSlotsSuccess,
} from './ContextApi/Home.actions';
import {bookSlotApiHelper, getSlotsApiHelper} from './apiService';
import RfBold from '../../components/RfBold/RfBold';
import {View} from 'react-native';
import {windowWidth} from '../../constant/AppConstant';
import RfText from '../../components/RfText/RfText';
import SimpleLoader from '../../components/SimpleLoader/SimpleLoader';
import ToastMessage from '../../components/ToastMessage/ToastMessage';
import HomeProvider, {HomeContext} from './ContextApi/HomeProvider';
function HomeScreen({navigation}) {
  const {
    homeStore: {
      slotsData: {loading, error},
    },
    homeDispatch,
  } = useContext(HomeContext);
  const [tabSelect, settabSelect] = useState(1);
  const [selectedSlot, setselectedSlot] = useState({});
  const [apiLoading, setapiLoading] = useState(false);
  const toast = useToast();
  const errorToast = msg => {
    toast.show({
      render: () => {
        return <ToastMessage text={msg} />;
      },
    });
  };
  useEffect(() => {
    getData();
    navigation.navigate(routes.Options);
  }, []);

  const getData = async () => {
    homeDispatch(getSlots());
    const res = await getSlotsApiHelper();
    if (res) {
      homeDispatch(getSlotsSuccess(res));
    } else {
      homeDispatch(getSlotsFailure());
    }
  };
  const handleBooking = async () => {
    if (!selectedSlot || apiLoading) return;
    setapiLoading(true);
    const res = await bookSlotApiHelper(selectedSlot.id);
    if (res.is_booked) {
      navigation.navigate(routes.BookedScreen);
    } else {
      errorToast(res.error?.message);
    }
    setapiLoading(false);
  };

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
        {loading ? (
          <View height={300}>
            <Loader />
          </View>
        ) : (
          <VStack mt={6}>
            <Tabs settabSelect={settabSelect} tabSelect={tabSelect} />
            <Slots
              setselectedSlot={setselectedSlot}
              selectedSlot={selectedSlot}
              tabSelect={tabSelect}
            />
            <Center mt={3}>
              <NeuButton
                active={!selectedSlot}
                borderRadius={8}
                height={40}
                width={windowWidth - 60}
                onPress={handleBooking}>
                {apiLoading ? (
                  <SimpleLoader />
                ) : selectedSlot ? (
                  <RfBold>Book</RfBold>
                ) : (
                  <RfText>Book</RfText>
                )}
              </NeuButton>
            </Center>
          </VStack>
        )}
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
