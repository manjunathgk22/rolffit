/* eslint-disable react-native/no-inline-styles */
import {Center, HStack, Text, View, VStack} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {windowHeight} from '../../constant/AppConstant';
import Colors from '../../constant/Colors';
import {GlobalContext} from '../../ContextApi/GlobalContextProvider';
import NeuButton from '../../HOC/NeuView/NeuButton';
import {HomeContext} from '../../pages/Home/ContextApi/HomeProvider';
import {tConvert} from '../../utility/AppUtility';
import RfBold from '../RfBold/RfBold';
import RfText from '../RfText/RfText';

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

  useEffect(() => {
    settodaySlots(
      TODAY?.slot_sessions?.map(item => {
        return {
          ...item,
          slot: {
            ...item.slot,
            time: tConvert(item.slot.start_time),
          },
        };
      }),
    );
    settomorrowSlots(
      TOMORROW?.slot_sessions?.map(item => {
        return {
          ...item,
          slot: {
            ...item.slot,
            time: tConvert(item.slot.start_time),
          },
        };
      }),
    );
  }, [TODAY, TOMORROW, tabSelect]);

  useEffect(() => {
    if (tabSelect === 1) {
      setselectedDateSlots(todaySlots);
    } else if (tabSelect === 2) {
      setselectedDateSlots(tomorrowSlots);
    }
  }, [todaySlots, tomorrowSlots, tabSelect]);

  useEffect(() => {
    setselectedSlot(null);
  }, [setselectedSlot, tabSelect]);

  const handleSlotSelection = selectedItem => {
    if (tabSelect === 1) {
      settodaySlots(
        todaySlots.map(item => {
          if (selectedItem.id === item.id) {
            setselectedSlot(selectedItem);
          }
          item.isSelected = selectedItem.id === item.id;

          return item;
        }),
      );
    } else {
      settomorrowSlots(
        tomorrowSlots.map(item => {
          if (selectedItem.id === item.id) {
            setselectedSlot(selectedItem);
          }
          item.isSelected = selectedItem.id === item.id;
          return item;
        }),
      );
    }
  };

  return (
    <View
      style={{
        height: futureBookingData?.length
          ? windowHeight - (320 + 140)
          : windowHeight - 320,
      }}>
      <ScrollView contentContainerStyle={{flexGrow: 0}}>
        <VStack>
          <HStack mt={6} pl={2} flexWrap={'wrap'} justifyContent={'flex-start'}>
            {selectedDateSlots.map((item, i) => (
              <NeuButton
                active={item.is_booked}
                onPress={() => {
                  !item.is_booked && handleSlotSelection(item);
                }}
                {...(item.isSelected
                  ? {convex: true, customGradient: Colors.gradient}
                  : {})}
                key={i}
                width={95}
                borderRadius={8}
                height={50}
                style={{
                  marginBottom: 15,
                  marginRight: (i + 1) % 3 === 0 ? 0 : 10,
                  marginLeft: i % 3 === 0 ? 5 : 0,
                }}>
                {item.isSelected ? (
                  <RfBold color={Colors.white}>{item.slot.time}</RfBold>
                ) : (
                  <RfText fontWeight={'bold'}>{item.slot.time}</RfText>
                )}
              </NeuButton>
            ))}
          </HStack>
        </VStack>
      </ScrollView>
    </View>
  );
};

export default Slots;
