import {
  Center,
  HStack,
  Icon,
  ScrollView,
  Text,
  View,
  VStack,
} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import Card from '../../../components/Card/Card';
import Loader from '../../../components/Loader/Loader';
import RfBold from '../../../components/RfBold/RfBold';
import RfText from '../../../components/RfText/RfText';
import {windowWidth} from '../../../constant/AppConstant';
import Colors from '../../../constant/Colors';
import NeuButton from '../../../HOC/NeuView/NeuButton';
import NeuView from '../../../HOC/NeuView/NeuView';
import {tConvert} from '../../../utility/AppUtility';
import {getData} from '../../../utility/StorageUtility';
import LogoutActionSheet from '../../Options/components/LogoutActionSheet/LogoutActionSheet';
import {
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

  const handleCheckIn = (slot, i) => {
    employeeCheckinApiHelper({
      slot_booking_id: slot.id,
    });

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
  };

  const handleCheckOut = (slot, i) => {
    employeeCheckoutApiHelper({
      slot_booking_id: slot.id,
    });
    const newData = therapistData.filter(
      therapistSlot => therapistSlot.id !== slot.id,
    );
    settherapistData(newData);
  };

  return (
    <VStack p={4} flex={1} backgroundColor={Colors.bg}>
      {apiLoading ? (
        <Center flex={1}>
          <Loader />
        </Center>
      ) : error ? (
        <Center flex={1}>
          <RfBold>Error fetching data</RfBold>
        </Center>
      ) : (
        <ScrollView flex={1}>
          <VStack p={4}>
            {therapistData.map((slot, i) => (
              <VStack mt={4}>
                <NeuView
                  height={i === 0 ? 150 : 100}
                  borderRadius={8}
                  width={windowWidth - 60}>
                  <VStack
                    // backgroundColor={Colors.error}
                    width={'100%'}
                    p={4}
                    flex={1}>
                    <Center>
                      <HStack>
                        <RfText>name: </RfText>
                        <RfBold>{slot.employee.first_name}</RfBold>
                      </HStack>
                      <HStack>
                        <RfText>Time: </RfText>
                        <RfBold>
                          {tConvert(slot.slot_session.slot?.start_time)}
                        </RfBold>
                      </HStack>
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
                          <NeuButton
                            style={{marginRight: 15}}
                            onPress={() => {
                              handleCheckIn(slot, i);
                            }}
                            height={40}>
                            <RfBold>Checkin</RfBold>
                          </NeuButton>
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
      <Center position={'absolute'} right={5} bottom={0}>
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
      <Center position={'absolute'} left={5} bottom={0}>
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
    </VStack>
  );
};

export default TherapistHome;
