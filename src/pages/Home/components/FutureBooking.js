import {Center, Text, View} from 'native-base';
import React, {useContext} from 'react';
import Carousel from 'react-native-snap-carousel';
import FutureBookingCard from '../../../components/FutureBookingCard/FutureBookingCard';
import {windowWidth} from '../../../constant/AppConstant';
import Colors from '../../../constant/Colors';
import {tConvert} from '../../../utility/AppUtility';
import {HomeContext} from '../ContextApi/HomeProvider';

const FutureBooking = ({getData}) => {
  const {
    homeStore: {
      futureBookings: {loading, error, data},
    },
    homeDispatch,
  } = useContext(HomeContext);
  const _renderItem = ({item: booking}) => (
    <Center paddingY={4} paddingX={10}>
      <FutureBookingCard
        getData={getData}
        booking={booking}
        time={tConvert(booking.slot_session.slot.start_time)}
      />
    </Center>
  );
  return data ? (
    <Carousel
      layout={'default'}
      data={data}
      renderItem={_renderItem}
      sliderWidth={windowWidth - 20}
      itemWidth={windowWidth - 20}
      autoplay={true}
      autoplayDelay={1200}
      autoplayInterval={3000}
      loop={true}
      loopClonesPerSide={2}
      // firstItem={1}
      inactiveSlideScale={0.94}
      inactiveSlideOpacity={0.7}
    />
  ) : null;
};

export default FutureBooking;
