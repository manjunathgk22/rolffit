/* eslint-disable react-native/no-inline-styles */
import {
  Center,
  HStack,
  View,
  Image,
  Text,
  useToast,
  VStack,
  Icon,
} from 'native-base';
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
import {StyleSheet} from 'react-native';
import {
  LOGIN_DATA,
  windowHeight,
  windowWidth,
} from '../../constant/AppConstant';
import RfText from '../../components/RfText/RfText';
import SimpleLoader from '../../components/SimpleLoader/SimpleLoader';
import ToastMessage from '../../components/ToastMessage/ToastMessage';
import HomeProvider, {HomeContext} from './ContextApi/HomeProvider';
import {useIsFocused} from '@react-navigation/native';
import Carousel from 'react-native-snap-carousel';
import FutureBooking from './components/FutureBooking';
import {isObjectEmpty} from '../../utility/AppUtility';
import {removeData} from '../../utility/StorageUtility';
import {
  setLoginData,
  setMaintenanceData,
} from '../../ContextApi/GlobalContext.actions';
import RescheduleActionSheet from './components/RescheduleActionSheet';
import TherapistHome from './components/TherapistHome';
import NeuView from '../../HOC/NeuView/NeuView';
import {constainerStyle} from '../../utility/Styles';
import NotOurPratner from './components/NotOurPratner';
import {sendEvent} from './util';
import {LAND_ON_HOME} from '../../constant/analyticsConstant';
import Entypo from 'react-native-vector-icons/Entypo';
import GradientView from '../../components/GradientView/GradientView';
import {callAPIs, getMaintenanceApi, STATUS} from '../../api/apiRequest';
import Maintenance from '../../components/Maintenance/Maintenance';

function HomeScreen({navigation}) {
  const {
    homeStore: {
      slotsData: {loading, error, data},
    },
    homeDispatch,
  } = useContext(HomeContext);
  const {
    globalStore: {loginData, maintenance},
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
        return <ToastMessage width={300} viewProps={{p: 2}} text={msg} />;
      },
    });
  };
  const isFocused = useIsFocused();

  useEffect(() => {
    sendEvent({event: LAND_ON_HOME});
  }, []);

  useEffect(() => {
    if (!isObjectEmpty(loginData?.user.employee)) {
      //Update the state you want to be updated
      isFocused && getData();
    }
    isFocused && checkMaintenance();
  }, [isFocused]);

  useEffect(() => {
    // getData();
    if (tabSelect === 1 && data?.TODAY?.booked) {
      setpastSelectedSlot(data?.TODAY?.booked);
    } else {
      setpastSelectedSlot(data?.TOMORROW?.booked);
    }
  }, [tabSelect, data]);

  const checkMaintenance = async () => {
    console.log('qqqhere');
    const response = await callAPIs(getMaintenanceApi());
    console.log('qqqhere11', response);
    if (response.status === STATUS.SUCCESS) {
      globalDispatch(setMaintenanceData(response.data));
    } else {
      globalDispatch(setMaintenanceData(null));
    }
  };

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
      errorToast(res.error);
    }
    setapiLoading(false);
  };

  return (
    <>
      {maintenance ? (
        <Maintenance />
      ) : isObjectEmpty(loginData?.user.employee) &&
        isObjectEmpty(loginData?.user.therapist) ? (
        // not our customer flow
        <NotOurPratner navigation={navigation} />
      ) : !isObjectEmpty(loginData?.user.employee) ? (
        <>
          <GradientView style={{height: windowHeight, flex: 1}}>
            <VStack p={4} flex={1}>
              <HStack justifyContent={'space-between'} alignItems={'center'}>
                <HStack alignItems={'center'}>
                  <NeuButton
                    onPress={() => {
                      NavigationService.navigate(routes.Options);
                    }}
                    height={40}
                    width={40}
                    borderRadius={50}>
                    {/* <Icon as={SimpleLineIcons} name="menu" color={Colors.white} /> */}
                    <Image source={require('../../assets/images/menu.png')} />
                  </NeuButton>
                  <RfBold ml={4}>Book your slot </RfBold>
                </HStack>
                <HStack alignItems={'center'}>
                  <Icon as={Entypo} name="location" color={Colors.white} />
                  <RfBold ml={2}>
                    {loginData?.user?.business_partner?.name}
                  </RfBold>
                </HStack>
              </HStack>
              <Center paddingX={4} mt={2}>
                <FutureBooking getData={getData} />
                {loading ? (
                  <View height={380}>
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
          </GradientView>
          {loading ? null : (
            <View position={'absolute'} bottom={0} width={windowWidth} pb={2}>
              <Center opacity={selectedSlot ? 1 : 0.5} mt={3}>
                <NeuButton
                  active={!selectedSlot}
                  borderRadius={8}
                  height={40}
                  width={windowWidth - 60}
                  {...(true
                    ? {convex: true, customGradient: Colors.gradient}
                    : {})}
                  onPress={handleBooking}>
                  {apiLoading ? (
                    <SimpleLoader color={Colors.white} />
                  ) : selectedSlot ? (
                    <RfBold color={Colors.white}>Confirm Booking</RfBold>
                  ) : (
                    <RfBold color={Colors.white}>Confirm Booking</RfBold>
                  )}
                </NeuButton>
              </Center>
            </View>
          )}
        </>
      ) : (
        <TherapistHome navigation={navigation} />
      )}
    </>
  );
}

const WrappedHomeScreen = props => (
  <HomeProvider>
    <HomeScreen {...props} />
  </HomeProvider>
);
export default WrappedHomeScreen;

const styles = StyleSheet.create({
  container: constainerStyle,
  image: {
    height: '100%',
  },
  google: {
    height: 30,
  },
});
