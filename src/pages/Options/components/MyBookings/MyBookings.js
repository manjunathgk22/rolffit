import {Center, Text, View, VStack} from 'native-base';
import React, {useContext, useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import Loader from '../../../../components/Loader/Loader';
import {windowHeight} from '../../../../constant/AppConstant';
import Colors from '../../../../constant/Colors';
import {GlobalContext} from '../../../../ContextApi/GlobalContextProvider';
import {rateMassageApiHelper} from '../../../Home/apiService';
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
  const {
    globalStore: {loginData},
    globalDispatch,
  } = useContext(GlobalContext);

  const [bookingData, setbookingData] = useState(data);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setbookingData(data);
  }, [data]);

  const getData = async () => {
    optionsDispatch(getMybooking());
    const response = await getMybookingApiHelper();
    if (response) {
      optionsDispatch(getMybookingSuccess(response.slot_bookings));
    } else {
      optionsDispatch(getMybookingFailure());
    }
  };

  const handleRating = async (booking, rating) => {
    const json = {
      user_id: booking.employee,
      user_type: 'employee',
      rating: rating,
      review: 'dummy',
      tag_identifier: 'slot_booking_id',
      tags: {
        slot_booking_id: booking.id,
        therapist_id: booking.therapist,
      },
    };
    rateMassageApiHelper(json);
    const newData = data.map(singleBooking => {
      if (singleBooking.id === booking.id) {
        singleBooking.rating_and_reviews = {
          ...singleBooking.rating_and_reviews,
          rating,
        };
      }
      return singleBooking;
    });
    setbookingData(newData);
  };

  return loading ? (
    <Center flex={1}>
      <Loader />
    </Center>
  ) : (
    <Center>
      {bookingData && bookingData.length > 0
        ? bookingData.map((booking, i) => (
            <BookingCard
              handleRating={handleRating}
              index={i}
              booking={booking}
            />
          ))
        : null}
    </Center>
  );
};

export default MyBookings;
