import {Center, Text, View, VStack} from 'native-base';
import React, {useContext, useState, useEffect} from 'react';
import Loader from '../../../../components/Loader/Loader';
import {getMybookingApiHelper} from '../../apiService';
import {
  getMybooking,
  getMybookingFailure,
  getMybookingSuccess,
} from '../../ContextApi/Options.actions';
import {OptionsContext} from '../../ContextApi/OptionsProvider';

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
    <VStack>
      <Text> asdasd</Text>
    </VStack>
  );
};

export default MyBookings;
