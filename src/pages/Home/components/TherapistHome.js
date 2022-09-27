import {
  Center,
  HStack,
  Icon,
  ScrollView,
  Text,
  useToast,
  View,
  VStack,
} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import Card from '../../../components/Card/Card';
import Loader from '../../../components/Loader/Loader';
import RfBold from '../../../components/RfBold/RfBold';
import RfText from '../../../components/RfText/RfText';
import {windowHeight, windowWidth} from '../../../constant/AppConstant';
import Colors from '../../../constant/Colors';
import NeuButton from '../../../HOC/NeuView/NeuButton';
import NeuView from '../../../HOC/NeuView/NeuView';
import {tConvert} from '../../../utility/AppUtility';
import {getData} from '../../../utility/StorageUtility';
import LogoutActionSheet from '../../Options/components/LogoutActionSheet/LogoutActionSheet';
import {
  employeeAbsentApiHelper,
  employeeCheckinApiHelper,
  employeeCheckoutApiHelper,
  getTherapistSlotsApiHelper,
} from '../apiService';
import {
  getTherapistSlots,
  getTherapistSlotsFailure,
  getTherapistSlotsSuccess,
} from '../ContextApi/Home.actions';
import {HomeContext} from '../ContextApi/HomeProvider';
import {AntDesign} from '@native-base/icons';
import moment from 'moment';
import ToastMessage from '../../../components/ToastMessage/ToastMessage';
import GradientView from '../../../components/GradientView/GradientView';
import {STATUS} from '../../../api/apiRequest';
import {Ionicons} from '@native-base/icons';
import {Linking} from 'react-native';

const TherapistHome = ({navigation}) => {
  const {
    homeStore: {
      therapistData: {loading, error, data},
    },
    homeDispatch,
  } = useContext(HomeContext);

  const [therapistData, settherapistData] = useState(data || []);
  const [apiLoading, setapiLoading] = useState(loading);
  const [showLogout, setshowLogout] = useState(false);

  const toast = useToast();

  const errorToast = msg => {
    toast.show({
      render: () => {
        return <ToastMessage viewProps={{p: 2}} text={msg} />;
      },
    });
  };
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    settherapistData(data || []);
  }, [data]);

  useEffect(() => {
    setapiLoading(loading);
  }, [loading]);

  const getData = async () => {
    homeDispatch(getTherapistSlots());
    const res = await getTherapistSlotsApiHelper();
    if (res) {
      homeDispatch(getTherapistSlotsSuccess(res));
    } else {
      homeDispatch(getTherapistSlotsFailure());
    }
  };

  const handleCheckIn = async (slot, i) => {
    const newData = therapistData.map(therapistSlot => {
      const temp = {
        ...therapistSlot,
      };
      if (temp.id === slot.id) {
        temp.checkedin = true;
      }
      return temp;
    });
    settherapistData(newData);

    const res = await employeeCheckinApiHelper({
      slot_booking_id: slot.id,
    });
    if (!res) {
      errorToast('Something went wrong');
    }
  };

  const handleCheckOut = async (slot, i) => {
    const newData = therapistData.filter(
      therapistSlot => therapistSlot.id !== slot.id,
    );
    settherapistData(newData);
    const res = await employeeCheckoutApiHelper({
      slot_booking_id: slot.id,
    });
    if (!res) {
      errorToast('Something went wrong');
    }
  };

  const markAbsent = async (slot, i) => {
    const newData = therapistData.filter(
      therapistSlot => therapistSlot.id !== slot.id,
    );
    const res = await employeeAbsentApiHelper({
      slot_booking_id: slot.id,
    });
    console.log('poiuy', res);
    if (res.data) {
      settherapistData(newData);
    } else {
      errorToast(res?.error?.message);
    }
  };

  return (
    <View flex={1} height={windowHeight}>
      <GradientView style={{height: windowHeight}}>
        <VStack height={windowHeight} p={4} flex={1}>
          {apiLoading ? (
            <Center flex={1}>
              <Loader />
            </Center>
          ) : error ? (
            <Center flex={1}>
              <RfBold>Error fetching data</RfBold>
            </Center>
          ) : (
            <ScrollView flex={1} showsVerticalScrollIndicator={false}>
              <VStack p={4}>
                {!therapistData?.length ? (
                  <Center flex={1}>
                    <RfBold>No Bookings</RfBold>
                  </Center>
                ) : null}
                {therapistData.map((slot, i) => (
                  <VStack mt={4}>
                    <NeuView
                      height={i === 0 ? 305 : 190}
                      borderRadius={8}
                      width={windowWidth - 60}>
                      <VStack
                        // backgroundColor={Colors.error}
                        width={'100%'}
                        p={4}
                        flex={1}>
                        <Center>
                          {slot.slot_session?.payment_details ? (
                            <Center>
                              <HStack>
                                <RfBold color={Colors.error}>
                                  Collect amount:{'  '}
                                </RfBold>
                                <RfBold color={Colors.error}>
                                  ₹{slot.slot_session?.payment_details.total}
                                </RfBold>
                              </HStack>
                            </Center>
                          ) : (
                            <RfBold color={Colors.blue}>
                              Free slot:{'  '}
                            </RfBold>
                          )}
                          <HStack>
                            <RfText>name: </RfText>
                            <RfBold>{slot.employee.first_name}</RfBold>
                          </HStack>
                          <HStack>
                            <RfText>Time: </RfText>
                            <RfBold>
                              {slot.slot_session.slot?.start_time_display} -{' '}
                              {slot.slot_session.slot?.end_time_display}
                            </RfBold>
                          </HStack>
                          <RfText ml={2} fontSize="sm">
                            {moment(slot.slot_session.slot_start_time).format(
                              'Do MMM',
                            )}
                          </RfText>
                        </Center>
                        {i === 0 ? (
                          <HStack
                            // backgroundColor={Colors.blue}
                            flex={1}
                            // width={'100%'}
                            mt={4}
                            justifyContent={'center'}>
                            {slot.checkedin ? (
                              <NeuButton
                                onPress={() => {
                                  handleCheckOut(slot, i);
                                }}
                                height={40}>
                                <RfBold>Checkout</RfBold>
                              </NeuButton>
                            ) : (
                              <Center>
                                <VStack space={6}>
                                  <HStack space={6}>
                                    <NeuButton
                                      // style={{marginRight: 15}}
                                      onPress={() => {
                                        markAbsent(slot, i);
                                      }}
                                      width={120}
                                      height={40}>
                                      <RfBold>Mark absent</RfBold>
                                    </NeuButton>
                                    <NeuButton
                                      // style={{marginRight: 15}}
                                      onPress={() => {
                                        handleCheckIn(slot, i);
                                      }}
                                      width={120}
                                      height={40}>
                                      <RfBold>Checkin</RfBold>
                                    </NeuButton>
                                  </HStack>
                                  <View>
                                    <Center mt={4}>
                                      <NeuButton
                                        style={{marginRight: 15}}
                                        width={120}
                                        height={40}
                                        onPress={() => {
                                          Linking.openURL(
                                            `tel:${slot.employee.mobile_no}`,
                                          );
                                        }}>
                                        <RfBold>Call</RfBold>
                                      </NeuButton>
                                    </Center>
                                  </View>
                                </VStack>
                              </Center>
                            )}
                          </HStack>
                        ) : null}
                      </VStack>
                    </NeuView>
                  </VStack>
                ))}
              </VStack>
            </ScrollView>
          )}
        </VStack>
        <Center position={'absolute'} right={5} bottom={10}>
          <NeuButton
            onPress={() => {
              getData();
            }}
            height={40}
            width={40}
            borderRadius={50}>
            <Icon as={AntDesign} name="sync" color={Colors.dark} />
          </NeuButton>
          <RfText>Refresh</RfText>
        </Center>
        <Center position={'absolute'} left={5} bottom={10}>
          <NeuButton
            onPress={() => {
              setshowLogout(true);
            }}
            height={40}
            width={40}
            borderRadius={50}>
            <Icon as={AntDesign} name="logout" color={Colors.dark} />
          </NeuButton>
          <RfText>Logout</RfText>
        </Center>
        <LogoutActionSheet
          showLogout={showLogout}
          setshowLogout={setshowLogout}
          navigation={navigation}
        />
      </GradientView>
    </View>
  );
};

export default TherapistHome;
