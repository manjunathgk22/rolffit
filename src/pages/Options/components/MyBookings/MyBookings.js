import {Center, Text, View, VStack} from 'native-base';
import React, {useContext, useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import Loader from '../../../../components/Loader/Loader';
import {windowHeight} from '../../../../constant/AppConstant';
import Colors from '../../../../constant/Colors';
import {getMybookingApiHelper} from '../../apiService';
import {
  getMybooking,
  getMybookingFailure,
  getMybookingSuccess,
} from '../../ContextApi/Options.actions';
import {OptionsContext} from '../../ContextApi/OptionsProvider';
import BookingCard from '../BookingCard/BookingCard';

const MyBookings = () => {
  const {
    optionsStore: {
      myBookings: {data, loading, error},
    },
    optionsDispatch,
  } = useContext(OptionsContext);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    optionsDispatch(getMybooking());
    const response = await getMybookingApiHelper();
    if (response) {
      optionsDispatch(getMybookingSuccess(response.slot_bookings));
    } else {
      optionsDispatch(getMybookingFailure());
    }
  };

  return loading ? (
    <Center flex={1}>
      <Loader />
    </Center>
  ) : (
    <Center>
      {data && data.length > 0
        ? data.map(booking => <BookingCard booking={booking} />)
        : null}
    </Center>
  );
};

export default MyBookings;
