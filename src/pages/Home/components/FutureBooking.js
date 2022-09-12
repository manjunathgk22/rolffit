/* eslint-disable react-native/no-inline-styles */
import {Center, HStack, Text, View, VStack} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import FutureBookingCard from '../../../components/FutureBookingCard/FutureBookingCard';
import MainCard from '../../../components/MainCard/MainCard';
import RfText from '../../../components/RfText/RfText';
import {windowWidth} from '../../../constant/AppConstant';
import Colors from '../../../constant/Colors';
import {tConvert} from '../../../utility/AppUtility';
import {HomeContext} from '../ContextApi/HomeProvider';

const FutureBooking = ({getData}) => {
  const [activeSlide, setactiveslide] = useState(0);
  const [allCards, setallCards] = useState(null);
  const {
    homeStore: {
      futureBookings: {loading, error, data},
      mainCard: {data: mainCardData},
    },
    homeDispatch,
  } = useContext(HomeContext);

  useEffect(() => {
    console.log('mainCardData', mainCardData);

    setallCards([
      ...(data?.length ? data : []),
      ...(mainCardData?.cards?.length ? mainCardData.cards : []),
    ]);
  }, [data, mainCardData]);

  const _renderItem = ({item}) => (
    <Center key={item.id || item?.card_id} paddingY={4} paddingX={10}>
      {item.ui ? (
        <MainCard item={item} />
      ) : (
        <FutureBookingCard
          getData={getData}
          booking={item}
          time={tConvert(item.slot_session.slot.start_time)}
        />
      )}
    </Center>
  );

  const pagination = () => {
    // const {entries, activeSlide} = this.state;
    return (
      <Pagination
        dotsLength={allCards.length}
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

  return allCards ? (
    <>
      {mainCardData?.cards?.length ? (
        <>
          <Carousel
            layout={'default'}
            data={mainCardData?.cards}
            renderItem={_renderItem}
            sliderWidth={Math.round(windowWidth - 20)}
            itemWidth={Math.round(windowWidth - 20)}
            autoplay={true}
            autoplayDelay={mainCardData?.visibility_duration || 7000}
            autoplayInterval={mainCardData?.visibility_duration || 7000}
            loop={true}
            enableSnap={true}
            loopClonesPerSide={mainCardData?.cards.length}
            onSnapToItem={index => setactiveslide(index)}
          />
          {mainCardData?.cards?.length > 1 ? <VStack mb={2} /> : null}

          {mainCardData?.cards?.length > 1 ? (
            <Center position={'absolute'} top={170}>
              <HStack alignItems={'center'}>
                {mainCardData?.cards.map((item, i) => (
                  <View
                    key={item}
                    style={i === activeSlide ? styles.activeDot : styles.dot}
                  />
                ))}
              </HStack>
            </Center>
          ) : null}
        </>
      ) : null}
      {data?.length ? (
        <>
          <Carousel
            layout={'default'}
            data={data}
            renderItem={_renderItem}
            sliderWidth={Math.round(windowWidth - 20)}
            itemWidth={Math.round(windowWidth - 20)}
            autoplay={true}
            autoplayDelay={mainCardData?.visibility_duration || 7000}
            autoplayInterval={mainCardData?.visibility_duration || 7000}
            loop={true}
            enableSnap={true}
            loopClonesPerSide={data.length}
            onSnapToItem={index => setactiveslide(index)}
            // firstItem={1}
            // inactiveSlideScale={0.94}
            // inactiveSlideOpacity={0.7}
          />
          <VStack mb={2} />
        </>
      ) : null}

      {/* {allCards?.length > 1 ? (
        <Center position={'absolute'} top={170}>
          <HStack alignItems={'center'}>
            {allCards.map((item, i) => (
              <View
                key={item}
                style={i === activeSlide ? styles.activeDot : styles.dot}
              />
            ))}
          </HStack>
        </Center>
      ) : null} */}
    </>
  ) : null;
};

export default FutureBooking;

const styles = StyleSheet.create({
  dot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    marginHorizontal: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
  },
  activeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
    backgroundColor: '#0478FF',
    border: `1px solid ${Colors.dark}`,
  },
});
