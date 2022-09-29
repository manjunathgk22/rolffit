import {
  Actionsheet,
  Center,
  Divider,
  HStack,
  Icon,
  Image,
  Radio,
  Text,
  View,
  VStack,
} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, TouchableOpacity} from 'react-native';
import RfBold from '../../../components/RfBold/RfBold';
import RfText from '../../../components/RfText/RfText';
import SimpleLoader from '../../../components/SimpleLoader/SimpleLoader';
import {windowWidth} from '../../../constant/AppConstant';
import Colors from '../../../constant/Colors';
import NeuButton from '../../../HOC/NeuView/NeuButton';
import NeuView from '../../../HOC/NeuView/NeuView';
import {tConvert} from '../../../utility/AppUtility';
import {getGeomanistbold} from '../../../utility/fontUtility';
import {HomeContext} from '../ContextApi/HomeProvider';
import {Entypo, Ionicons, AntDesign} from '@native-base/icons';

const SlotInfo = ({
  selectedSlot = {payment_details: null},
  handleBooking,
  apiLoading,
  onClose,
  currentSlot,
  tabSelect,
}) => {
  console.log('selectedSlot', selectedSlot);
  const {payment_details: paymentDetails} = selectedSlot;
  const [therapist, settherapist] = useState(null);
  const [selectedTherapist, setselectedTherapist] = useState(null);

  const {
    homeStore: {
      slotsData: {loading, error, data},
    },
    homeDispatch,
  } = useContext(HomeContext);

  useEffect(() => {
    let tempTherpaist =
      tabSelect === 1 ? data?.TODAY?.therapists : data?.TOMORROW?.therapists;
    tempTherpaist = tempTherpaist?.filter(ther => {
      return selectedSlot.therapist_ids.includes(ther.id);
    });
    settherapist(tempTherpaist);
  }, [data, selectedSlot.therapist_ids, tabSelect]);

  const renderTherapistData = () => {
    console.log('vvvv', therapist?.length);

    const renderUI = ther => (
      <NeuView height={80} width={windowWidth - 60} borderRadius={12}>
        <HStack
          width={'100%'}
          p={2}
          px={4}
          borderRadius={12}
          justifyContent={'space-between'}
          alignItems={'center'}>
          <HStack space={4} alignItems={'center'}>
            <NeuView height={60} borderRadius={60} width={60}>
              {ther?.user?.photo_url ? (
                <Image
                  size={55}
                  borderRadius={100}
                  source={{
                    uri: ther?.user?.photo_url,
                  }}
                  alt="Alternate Text"
                />
              ) : (
                <NeuView inset height={55} borderRadius={55} width={55}>
                  <View
                    width={'100%'}
                    height={'100%'}
                    justifyContent={'center'}
                    alignItems={'center'}>
                    <Text
                      color={Colors.dark}
                      fontWeight="700"
                      style={{
                        fontFamily: getGeomanistbold(),
                      }}
                      textTransform={'uppercase'}
                      fontSize={'4xl'}>
                      {`${ther?.user?.first_name.charAt(0)}`}
                    </Text>
                  </View>
                </NeuView>
              )}
            </NeuView>
            <RfBold>{ther?.user?.first_name}</RfBold>
          </HStack>
          <View>
            {ther.id === selectedTherapist ? (
              <Icon
                size={'lg'}
                as={Ionicons}
                name="checkmark-circle"
                color={Colors.blue}
              />
            ) : null}
          </View>
        </HStack>
      </NeuView>
    );

    if (therapist?.length === 1) {
      return (
        <>
          <Divider my={2} />
          <View flex={1} width={'100%'} px={6} mt={2}>
            <RfBold mb={2}>Your therapist is</RfBold>
            {therapist?.map(ther => renderUI(ther))}
          </View>
        </>
      );
    }
    if (therapist?.length > 1) {
      //
      return (
        <>
          <Divider my={2} />
          <View flex={1} width={'100%'} px={6} mt={2}>
            <VStack space={4}>
              <RfBold>Select your therapist</RfBold>
              {therapist?.map(ther => (
                <TouchableOpacity onPress={() => setselectedTherapist(ther.id)}>
                  {renderUI(ther)}
                </TouchableOpacity>
              ))}
            </VStack>
          </View>
        </>
      );
    }
    return null;
  };

  return (
    <Actionsheet hideDragIndicator isOpen={true} onClose={onClose}>
      <Actionsheet.Content background={Colors.bg} padding={0}>
        {currentSlot ? (
          selectedSlot.payment_details ? (
            <RfBold>This is not a free slot</RfBold>
          ) : (
            <RfBold>This is a free slot</RfBold>
          )
        ) : null}
        <View
          bottom={0}
          minHeight={200}
          maxHeight={500}
          width={windowWidth}
          pb={2}>
          <ScrollView>
            {paymentDetails ? (
              <VStack p={4} pt={0} mt={2}>
                <RfBold>Summary</RfBold>
                <Divider my={2} />
                <VStack>
                  <HStack mt={0} justifyContent={'space-between'}>
                    <RfText fontSize={'lg'}>Price</RfText>
                    <RfText fontSize={'lg'}>₹{paymentDetails.price}</RfText>
                  </HStack>
                  {paymentDetails?.discount ? (
                    <HStack mt={0} justifyContent={'space-between'}>
                      <RfText color={Colors.blue} fontSize={'lg'}>
                        Discount
                      </RfText>
                      <RfText color={Colors.blue} fontSize={'lg'}>
                        ₹{paymentDetails.discount}
                      </RfText>
                    </HStack>
                  ) : null}
                  <HStack mt={0} justifyContent={'space-between'}>
                    <RfText>Taxes</RfText>
                    <RfText>₹{paymentDetails.tax}</RfText>
                  </HStack>
                  <HStack mt={2} justifyContent={'space-between'}>
                    <RfBold fontSize={'xl'}>Grand total</RfBold>
                    <RfBold fontSize={'xl'}>₹{paymentDetails.total}</RfBold>
                  </HStack>
                </VStack>
              </VStack>
            ) : null}

            <View
              flex={1}
              width={'100%'}
              mt={4}
              minHeight={paymentDetails ? 100 : 200}>
              <View ml={6} mt={3}>
                {currentSlot ? (
                  <>
                    <HStack>
                      <RfText>You already have a booking at </RfText>
                      <RfBold>{tConvert(currentSlot.slot.start_time)}</RfBold>
                    </HStack>
                    <HStack mt={0}>
                      <RfText>Do you want to reschedule it to </RfText>
                      <RfBold>
                        {tConvert(selectedSlot.slot.start_time)} ?
                      </RfBold>
                    </HStack>
                  </>
                ) : (
                  <>
                    <HStack>
                      <RfText>Session is from </RfText>
                      <RfBold>{tConvert(selectedSlot?.slot.start_time)}</RfBold>
                      <RfText> to </RfText>
                      <RfBold>{tConvert(selectedSlot?.slot.end_time)}</RfBold>
                    </HStack>
                    <HStack>
                      <RfText>Session duration will be </RfText>
                      <RfBold>
                        {tConvert(selectedSlot?.duration)} minutes
                      </RfBold>
                    </HStack>
                  </>
                )}
              </View>
              {renderTherapistData()}

              <Center mt={6} mb={3}>
                <NeuButton
                  active={!selectedSlot}
                  borderRadius={8}
                  height={40}
                  width={windowWidth - 60}
                  {...(true
                    ? {convex: true, customGradient: Colors.gradient}
                    : {})}
                  onPress={() => handleBooking(selectedTherapist)}>
                  {apiLoading ? (
                    <SimpleLoader color={Colors.white} />
                  ) : selectedSlot ? (
                    <RfBold color={Colors.white}>Confirm Booking</RfBold>
                  ) : (
                    <RfBold color={Colors.white}>Confirm Booking</RfBold>
                  )}
                </NeuButton>
              </Center>
            </View>
          </ScrollView>
        </View>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default SlotInfo;
