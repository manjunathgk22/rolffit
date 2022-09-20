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
  ScrollView,
} from 'native-base';
import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
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
  getMainCardFailure,
  getMainCardSuccess,
  getSlots,
  getSlotsFailure,
  getSlotsSuccess,
} from './ContextApi/Home.actions';
import {
  bookSlotApiHelper,
  futureBookingApiHelper,
  getSlotsApiHelper,
  mainCardApiHelper,
  rescheduleApiHelper,
} from './apiService';
import RfBold from '../../components/RfBold/RfBold';
import {AppState, StyleSheet} from 'react-native';
import {
  FCM_TOKEN,
  LOGIN_DATA,
  miscData,
  NOTIFDATA,
  setNotifData,
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
import GradientView from '../../components/GradientView/GradientView';
import {Entypo, Ionicons, AntDesign} from '@native-base/icons';
import SlotInfo from './components/SlotInfo';
import Maintenance from '../../components/Maintenance/Maintenance';
import {callAPIs, getMaintenanceApi, STATUS} from '../../api/apiRequest';
import MainCard from '../../components/MainCard/MainCard';
import {NotifHandler} from '../../utility/NotifHandler';

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
  const [selectedSlot, setselectedSlot] = useState(null); //current selected slot
  const [apiLoading, setapiLoading] = useState(false); //
  const [showReschedulePopup, setshowReschedulePopup] = useState(false); // reeschedule popup
  const [pastSelectedSlot, setpastSelectedSlot] = useState(null);
  const [showSlotInfo, setshowSlotInfo] = useState(false);
  const [appState, setappState] = useState(null);

  const toast = useToast();
  const errorToast = msg => {
    toast.show({
      render: () => {
        return <ToastMessage text={msg} />;
      },
    });
  };
  const isFocused = useIsFocused();

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

  useLayoutEffect(() => {
    console.log('cmcm', appState, NOTIFDATA);
    if (NOTIFDATA && (appState === 'active' || isFocused)) {
      NotifHandler();
    }
  }, [isFocused, appState]);

  useEffect(() => {
    AppState.addEventListener('change', handleChange);
    return () => {
      AppState.removeEventListener('change', handleChange);
    };
  }, []);

  const handleChange = state => {
    setappState(state);
    miscData.APP_STATE = state;
  };

  useEffect(() => {
    sendEvent({event: LAND_ON_HOME});
  }, []);

  useEffect(() => {
    if (!isObjectEmpty(loginData?.user.employee)) {
      //Update the state you want to be updated
      isFocused && getData();
      checkMaintenance();
    }
  }, [isFocused]);

  useEffect(() => {
    // getData();
    if (tabSelect === 1 && data?.TODAY?.booked) {
      setpastSelectedSlot(data?.TODAY?.booked);
    } else {
      setpastSelectedSlot(data?.TOMORROW?.booked);
    }
  }, [tabSelect, data]);

  useEffect(() => {
    console.log(selectedSlot);
    if (selectedSlot) {
      // if (shouldReschedule()) {
      //   handleRescheduleFLow();
      // } else {
      //   setshowSlotInfo(true);
      // }
      setshowSlotInfo(true);
    } else {
      setshowSlotInfo(false);
    }
  }, [selectedSlot]);

  const getData = async () => {
    homeDispatch(getSlots());
    homeDispatch(getFutureBooking());
    // const slots = await getSlotsApiHelper();
    // const futurebooking = await futureBookingApiHelper();
    const [slots, futurebooking, mainCardData] = await Promise.all([
      getSlotsApiHelper(),
      futureBookingApiHelper(),
      mainCardApiHelper(),
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
    if (mainCardData) {
      homeDispatch(getMainCardSuccess(mainCardData));
    } else {
      homeDispatch(getMainCardFailure());
    }
  };

  const handleRescheduleFLow = () => {
    // errorToast('booked');
    setshowReschedulePopup(true);
  };

  const shouldReschedule = () => {
    if (
      (tabSelect === 1 && data?.TODAY?.booked) ||
      (tabSelect === 2 && data?.TOMORROW?.booked)
    ) {
      return true;
    }
  };

  const handleBooking = async () => {
    if (!selectedSlot || apiLoading) return;
    setapiLoading(true);
    let res;
    if (pastSelectedSlot) {
      const json = {
        reschedule_slot_session_data: {
          // therapist_id: 1,
          slot_session_id: selectedSlot.id,
        },
        cancel_slot_data: {
          slot_booking_id: pastSelectedSlot.slot_booking_id,
        },
      };
      res = await rescheduleApiHelper(json);
    } else {
      res = await bookSlotApiHelper(selectedSlot.id);
    }
    if (selectedSlot && !pastSelectedSlot) {
      if (res.is_booked) {
        navigation.navigate(routes.BookedScreen, {
          selectedSlot,
        });
      } else {
        errorToast(res?.message);
      }
    } else {
      if (res?.is_booked) {
        navigation.navigate(routes.BookedScreen, {
          selectedSlot,
        });
      } else {
        errorToast(res?.message);
      }
    }
    setapiLoading(false);
    setselectedSlot(null);
  };

  const renderView = () => {
    if (maintenance) {
      return <Maintenance />;
    }
    if (
      isObjectEmpty(loginData?.user.employee) &&
      isObjectEmpty(loginData?.user.therapist)
    ) {
      // new user. neither an employee nor a therapist
      return <NotOurPratner navigation={navigation} />;
    }
    // is employee
    if (!isObjectEmpty(loginData?.user.employee)) {
      return (
        <>
          <GradientView style={{height: windowHeight, flex: 1}}>
            <VStack p={4} flex={1}>
              <HStack
                pb={2}
                justifyContent={'space-between'}
                alignItems={'center'}>
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
                  <RfBold ml={4}>Book your slot</RfBold>
                </HStack>
                <HStack alignItems={'center'}>
                  <Icon as={Entypo} name="location" color={Colors.white} />
                  <RfBold ml={2}>
                    {loginData?.user?.slot_business_partner?.name}
                  </RfBold>
                </HStack>
              </HStack>
              <ScrollView>
                <Center paddingX={4} mt={2}>
                  <FutureBooking getData={getData} />
                  {loading ? (
                    <View height={380}>
                      <Loader />
                    </View>
                  ) : (
                    <VStack mt={4}>
                      {data?.allData?.message ? (
                        <Center>
                          <RfBold textAlign="center" fontSize={'2xl'} mt={6}>
                            {data?.allData?.message}
                          </RfBold>
                        </Center>
                      ) : (
                        <>
                          <Tabs
                            settabSelect={settabSelect}
                            tabSelect={tabSelect}
                          />
                          <Slots
                            setselectedSlot={setselectedSlot}
                            selectedSlot={selectedSlot}
                            tabSelect={tabSelect}
                          />
                        </>
                      )}
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
                {showSlotInfo && selectedSlot ? (
                  <SlotInfo
                    onClose={() => {
                      setselectedSlot(null);
                    }}
                    handleBooking={handleBooking}
                    currentSlot={pastSelectedSlot}
                    selectedSlot={selectedSlot}
                    apiLoading={apiLoading}
                  />
                ) : null}
              </ScrollView>
            </VStack>
          </GradientView>
        </>
      );
    } else {
      // therapist
      return <TherapistHome navigation={navigation} />;
    }
  };

  return renderView();
}

const WrappedHomeScreen = props => (
  <HomeProvider>
    <HomeScreen {...props} />
  </HomeProvider>
);
export default WrappedHomeScreen;
