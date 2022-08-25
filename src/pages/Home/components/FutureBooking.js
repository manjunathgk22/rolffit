/* eslint-disable react-native/no-inline-styles */
import {Center, HStack, Text, View, VStack} from 'native-base';
import React, {useContext, useState} from 'react';
import {StyleSheet} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import FutureBookingCard from '../../../components/FutureBookingCard/FutureBookingCard';
import RfText from '../../../components/RfText/RfText';
import {windowWidth} from '../../../constant/AppConstant';
import Colors from '../../../constant/Colors';
import {tConvert} from '../../../utility/AppUtility';
import {HomeContext} from '../ContextApi/HomeProvider';

const FutureBooking = ({getData}) => {
  const [activeSlide, setactiveslide] = useState(0);
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

  const pagination = () => {
    // const {entries, activeSlide} = this.state;
    return (
      <Pagination
        dotsLength={Object.values(data).length}
        activeDotIndex={activeSlide}
        // containerStyle={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: 'rgba(255, 255, 255, 1)',
          border: `1px solid ${Colors.dark}`,
        }}
        inactiveDotStyle={{
          width: 8,
          height: 8,
          borderRadius: 5,
          marginHorizontal: 8,
          backgroundColor: Colors.dark,
          // Define styles for inactive dots here
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        onSnapToItem={index => setactiveslide(index)}
      />
    );
  };

  return data ? (
    <>
      <Carousel
        layout={'default'}
        data={data}
        renderItem={_renderItem}
        sliderWidth={Math.round(windowWidth - 20)}
        itemWidth={Math.round(windowWidth - 20)}
        autoplay={true}
        autoplayDelay={20000}
        autoplayInterval={20000}
        loop={true}
        enableSnap={true}
        loopClonesPerSide={data.length}
        onSnapToItem={index => setactiveslide(index)}
        // firstItem={1}
        // inactiveSlideScale={0.94}
        // inactiveSlideOpacity={0.7}
      />
      {data?.length > 1 ? (
        <Center position={'absolute'} top={165}>
          <HStack alignItems={'center'}>
            {data.map((item, i) => (
              <View
                key={item}
                style={i === activeSlide ? styles.activeDot : styles.dot}
              />
            ))}
          </HStack>
        </Center>
      ) : null}
    </>
  ) : null;
};

export default FutureBooking;

const styles = StyleSheet.create({
  dot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 8,
    backgroundColor: '#0478FF',
    border: `1px solid ${Colors.dark}`,
  },
});
