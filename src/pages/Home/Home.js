/* eslint-disable react-native/no-inline-styles */
import {
  Box,
  Button,
  Center,
  HStack,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  VStack,
} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {GlobalContext} from '../../ContextApi/GlobalContextProvider';
import {getDates} from './util';
import moment from 'moment';
import Colors from '../../constant/Colors';
import {TouchableOpacity, View} from 'react-native';
import {printLog} from '../../utility/AppUtility';
import Loader from '../../components/Loader/Loader';
import HomeProvider, {HomeContext} from './ContextApi/HomeProvider';

function HomeScreen() {
  const {globalStore, globalDispatch} = useContext(GlobalContext);
  const {homeStore, homeDispatch} = useContext(HomeContext);

  const [dates, setDates] = useState([]);
  const [btndisabled, setbtndisabled] = useState(true);
  const [selectedDate, setselectedDate] = useState(null);
  useEffect(() => {
    const dates = getDates();
    setDates(
      dates.map((date, i) => {
        return {
          date,
          isSelected: !i,
          slots: i % 2 ? dummySlots : [],
        };
      }),
    );
    setselectedDate(dates[0]);
    return () => {
      document.getElementById('popup-content').style.zIndex = '3 !important';
    };
  }, []);
  useEffect(() => {
    printLog('homeStore', homeStore);
    printLog('globalStore', globalStore);
  }, [homeStore, globalStore]);
  const handleDateChange = (date, index) => {
    printLog('here');
    setDates(
      dates.map((dd, i) => ({
        ...dd,
        isSelected: i === index,
      })),
    );
    setselectedDate(date);
  };
  const handleSlotSelection = (slot, i) => {
    if (selectedDate.slots?.[i]?.isSelected) {
      setbtndisabled(true);
    } else {
      setbtndisabled(false);
    }
    setselectedDate({
      ...selectedDate,
      slots: selectedDate.slots?.map((sl, index) => {
        return {
          ...sl,
          isSelected: index === i,
        };
      }),
    });
  };
  return (
    <VStack flex={1}>
      <HStack space={0} justifyContent="center">
        {dates?.map((date, index) => (
          <TouchableOpacity
            onPress={() => {
              handleDateChange(date, index);
            }}
            key={date.date}
            style={{
              backgroundColor: date.isSelected ? '#fff' : '#ddd',
              flex: 1,
              padding: 10,
              borderRightWidth: 1,
              borderRightColor: Colors.border,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text fontSize={'xl'} fontWeight={'semibold'}>
              {moment(date.date, 'YYYY-MM-DD').format('ddd')}
            </Text>
            <Text fontSize={'md'} fontWeight={'semibold'}>
              {moment(date.date, 'YYYY-MM-DD').format('DD')}
            </Text>
            <Text fontSize={'md'} fontWeight={'semibold'}>
              {moment(date.date, 'YYYY-MM-DD').format('MMM')}
            </Text>
          </TouchableOpacity>
        ))}
      </HStack>
      <ScrollView flex={1} mt={6} mb={2} p={4}>
        <HStack
          flex={1}
          pb={4}
          flexWrap={'wrap'}
          background={'red'}
          justifyContent="flex-start">
          {selectedDate?.slots?.map((slot, i) => (
            <TouchableOpacity
              onPress={() => {
                handleSlotSelection(slot, i);
              }}
              style={{
                alignSelf: 'center',
                borderWidth: 1,
                borderRadius: 4,
                flexBasis: '45%',
                marginRight: i % 2 ? '0%' : '5%',
                marginLeft: i % 2 ? '5%' : '0%',
                marginBottom: '5%',
                padding: 5,
                borderColor: Colors.border,
                backgroundColor: slot.isSelected ? '#fff' : '#ddd',
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '600',
                  textAlign: 'center',
                }}>
                {slot.time}
              </Text>
            </TouchableOpacity>
          ))}
        </HStack>
      </ScrollView>
      <Button
        disabled={btndisabled}
        colorScheme={btndisabled ? 'dark' : 'success'}
        mx={20}
        mt={4}
        mb={4}>
        Book
      </Button>
    </VStack>
  );
}

const WrappedHomeScreen = props => (
  <HomeProvider>
    <HomeScreen {...props} />
  </HomeProvider>
);
export default WrappedHomeScreen;

const dummySlots = [
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
  {
    time: '10:00 AM',
  },
];
