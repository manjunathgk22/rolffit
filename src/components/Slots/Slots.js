/* eslint-disable react-native/no-inline-styles */
import {Center, HStack, Text, View, VStack} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {windowHeight, windowWidth} from '../../constant/AppConstant';
import Colors from '../../constant/Colors';
import {GlobalContext} from '../../ContextApi/GlobalContextProvider';
import NeuButton from '../../HOC/NeuView/NeuButton';
import {HomeContext} from '../../pages/Home/ContextApi/HomeProvider';
import {tConvert} from '../../utility/AppUtility';
import RfBold from '../RfBold/RfBold';
import RfText from '../RfText/RfText';

const title = {
  free: 'free slots',
  paid: 'paid slots',
};

const Slots = ({tabSelect, setselectedSlot, selectedSlot}) => {
  const [todaySlots, settodaySlots] = useState([]);
  const [tomorrowSlots, settomorrowSlots] = useState([]);
  const [selectedDateSlots, setselectedDateSlots] = useState([]);
  // const [selectedSlot, setselectedSlot] = useState({});

  const {
    homeStore: {
      slotsData: {
        data: {TODAY, TOMORROW},
      },
      futureBookings: {loading, error, data: futureBookingData},
    },
    homeDispatch,
  } = useContext(HomeContext);

  const getSlots = key => {
    return {
      free: key?.free?.map(item => {
        return {
          ...item,
          slot: {
            ...item.slot,
            time: tConvert(item.slot.start_time),
          },
        };
      }),
      paid: key?.paid?.map(item => {
        return {
          ...item,
          slot: {
            ...item.slot,
            time: tConvert(item.slot.start_time),
          },
        };
      }),
      allSlots: key?.slot_sessions?.map(item => {
        return {
          ...item,
          slot: {
            ...item.slot,
            time: tConvert(item.slot.start_time),
          },
        };
      }),
    };
  };

  const setSlot = (selectedItem, key) => {
    return {
      free: key.free.map(item => {
        item.isSelected = selectedItem.id === item.id;
        return item;
      }),
      paid: key.paid.map(item => {
        item.isSelected = selectedItem.id === item.id;
        return item;
      }),
      allSlots: key.allSlots.map(item => {
        if (selectedItem.id === item.id) {
          setselectedSlot(selectedItem);
        }
        item.isSelected = selectedItem.id === item.id;
        return item;
      }),
    };
  };

  useEffect(() => {
    if (!selectedSlot) {
      settodaySlots(getSlots(TODAY));
      settomorrowSlots(getSlots(TOMORROW));
    }
  }, [TODAY, TOMORROW, tabSelect, selectedSlot]);

  useEffect(() => {
    if (tabSelect === 1) {
      setselectedDateSlots(todaySlots || []);
    } else if (tabSelect === 2) {
      setselectedDateSlots(tomorrowSlots || []);
    }
  }, [todaySlots, tomorrowSlots, tabSelect]);

  useEffect(() => {
    setselectedSlot(null);
  }, [setselectedSlot, tabSelect]);

  const handleSlotSelection = selectedItem => {
    if (tabSelect === 1) {
      settodaySlots(setSlot(selectedItem, todaySlots));
    } else {
      settomorrowSlots(setSlot(selectedItem, tomorrowSlots));
    }
  };

  return (
    <View>
      <VStack pb={2}>
        <VStack mt={6}>
          {['free', 'paid']?.map(key =>
            selectedDateSlots?.[key]?.length ? (
              <VStack>
                <RfBold ml={4}>{title[key]}</RfBold>
                <HStack
                  mt={4}
                  pl={2}
                  flexWrap={'wrap'}
                  justifyContent={'flex-start'}>
                  {selectedDateSlots?.[key]?.map((item, i) => (
                    <NeuButton
                      active={item.is_booked}
                      onPress={() => {
                        !item.is_booked && handleSlotSelection(item);
                      }}
                      {...(item.isSelected
                        ? {convex: true, customGradient: Colors.gradient}
                        : {})}
                      key={i}
                      flex={1}
                      flexBasis={10}
                      width={windowWidth < 380 ? 85 : 95}
                      borderRadius={8}
                      height={50}
                      {...(item.has_user_booked
                        ? {convex: true, customGradient: Colors.gradient}
                        : {})}
                      style={{
                        marginBottom: 15,
                        marginRight: (i + 1) % 3 === 0 ? 0 : 10,
                        marginLeft: i % 3 === 0 ? 5 : 0,
                      }}>
                      {item.isSelected || item.has_user_booked ? (
                        item.has_user_booked ? (
                          <VStack>
                            <RfBold
                              textAlign="center"
                              lineHeight={23}
                              color={Colors.white}>
                              Booked
                            </RfBold>
                            <RfBold
                              textAlign="center"
                              lineHeight={23}
                              color={Colors.white}>
                              {item.slot.time}
                            </RfBold>
                          </VStack>
                        ) : (
                          <RfBold
                            textAlign="center"
                            lineHeight={23}
                            color={Colors.white}>
                            {item.slot.time}
                          </RfBold>
                        )
                      ) : (
                        <RfText fontWeight={'bold'}>{item.slot.time}</RfText>
                      )}
                    </NeuButton>
                  ))}
                </HStack>
              </VStack>
            ) : null,
          )}
        </VStack>
      </VStack>
    </View>
  );
};

export default Slots;
