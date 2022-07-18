/* eslint-disable react-native/no-inline-styles */
import {Center, HStack, Icon, Text, useToast, VStack} from 'native-base';
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
  getFutureBooking,
  getFutureBookingFailure,
  getFutureBookingSuccess,
  getSlots,
  getSlotsFailure,
  getSlotsSuccess,
} from './ContextApi/Home.actions';
import {
  bookSlotApiHelper,
  futureBookingApiHelper,
  getSlotsApiHelper,
} from './apiService';
import RfBold from '../../components/RfBold/RfBold';
import {View} from 'react-native';
import {LOGIN_DATA, windowWidth} from '../../constant/AppConstant';
import RfText from '../../components/RfText/RfText';
import SimpleLoader from '../../components/SimpleLoader/SimpleLoader';
import ToastMessage from '../../components/ToastMessage/ToastMessage';
import HomeProvider, {HomeContext} from './ContextApi/HomeProvider';
import {useIsFocused} from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import FutureBooking from './components/FutureBooking';
import {isObjectEmpty} from '../../utility/AppUtility';
import {removeData} from '../../utility/StorageUtility';
import {setLoginData} from '../../ContextApi/GlobalContext.actions';
import RescheduleActionSheet from './components/RescheduleActionSheet';
import TherapistHome from './components/TherapistHome';
function HomeScreen({navigation}) {
  const {
    homeStore: {
      slotsData: {loading, error, data},
    },
    homeDispatch,
  } = useContext(HomeContext);
  const {
    globalStore: {loginData},
    globalDispatch,
  } = useContext(GlobalContext);

  const [tabSelect, settabSelect] = useState(1); // tabs
  const [selectedSlot, setselectedSlot] = useState({}); //current selected slot
  const [apiLoading, setapiLoading] = useState(false); //
  const [showReschedulePopup, setshowReschedulePopup] = useState(false); // reeschedule popup
  const [pastSelectedSlot, setpastSelectedSlot] = useState(null);

  const toast = useToast();
  const errorToast = msg => {
    toast.show({
      render: () => {
        return <ToastMessage text={msg} />;
      },
    });
  };
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!isObjectEmpty(loginData?.user.employee)) {
      //Update the state you want to be updated
      isFocused && getData();
    }
  }, [isFocused]);

  useEffect(() => {
    // getData();
    if (tabSelect === 1 && data?.TODAY?.booked) {
      setpastSelectedSlot(data?.TODAY?.booked);
    }
  }, [tabSelect, data]);

  const getData = async () => {
    homeDispatch(getSlots());
    homeDispatch(getFutureBooking());
    // const slots = await getSlotsApiHelper();
    // const futurebooking = await futureBookingApiHelper();
    const [slots, futurebooking] = await Promise.all([
      getSlotsApiHelper(),
      futureBookingApiHelper(),
    ]);
    if (slots) {
      homeDispatch(getSlotsSuccess(slots));
    } else {
      homeDispatch(getSlotsFailure());
    }
    if (futurebooking) {
      homeDispatch(getFutureBookingSuccess(futurebooking));
    } else {
      homeDispatch(getFutureBookingFailure());
    }
  };

  const handleRescheduleFLow = () => {
    // errorToast('booked');
    setshowReschedulePopup(true);
  };

  const handleBooking = async () => {
    if (!selectedSlot || apiLoading) return;
    if (
      (tabSelect === 1 && data?.TODAY?.booked) ||
      (tabSelect === 2 && data?.TOMORROW?.booked)
    ) {
      handleRescheduleFLow();
      return;
    }
    setapiLoading(true);
    const res = await bookSlotApiHelper(selectedSlot.id);
    if (res.is_booked) {
      navigation.navigate(routes.BookedScreen, {
        selectedSlot,
      });
    } else {
      errorToast(res.error?.message);
    }
    setapiLoading(false);
  };

  const handleLogout = async () => {
    await removeData({key: LOGIN_DATA});
    globalDispatch(setLoginData(null));
    navigation.reset({
      index: 0,
      routes: [{name: routes.Signin}],
    });
  };

  return isObjectEmpty(loginData?.user.employee) &&
    isObjectEmpty(loginData?.user.therapist) ? (
    // not our customer flow
    <Center flex={1} backgroundColor={Colors.bg}>
      <RfBold>You are not ROLF.FIT partner</RfBold>
      <NeuButton onPress={handleLogout} height={50}>
        <RfBold>Logout</RfBold>
      </NeuButton>
    </Center>
  ) : !isObjectEmpty(loginData?.user.employee) ? (
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
      <Center paddingX={4} mt={2}>
        <FutureBooking />
        {loading ? (
          <View height={300}>
            <Loader />
          </View>
        ) : (
          <VStack mt={4}>
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
      {showReschedulePopup ? (
        <RescheduleActionSheet
          errorToast={errorToast}
          open={showReschedulePopup}
          currentSlot={pastSelectedSlot}
          newSlot={selectedSlot}
          onClose={() => setshowReschedulePopup(false)}
        />
      ) : null}
    </VStack>
  ) : (
    <TherapistHome navigation={navigation} />
  );
}

const WrappedHomeScreen = props => (
  <HomeProvider>
    <HomeScreen {...props} />
  </HomeProvider>
);
export default WrappedHomeScreen;
