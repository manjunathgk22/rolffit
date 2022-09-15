import {Actionsheet, Center, Divider, HStack, View, VStack} from 'native-base';
import React from 'react';
import RfBold from '../../../components/RfBold/RfBold';
import RfText from '../../../components/RfText/RfText';
import SimpleLoader from '../../../components/SimpleLoader/SimpleLoader';
import {windowWidth} from '../../../constant/AppConstant';
import Colors from '../../../constant/Colors';
import NeuButton from '../../../HOC/NeuView/NeuButton';
import {tConvert} from '../../../utility/AppUtility';

// monetisation = {
//   total:
//   discount:
//   tax:
//   grand_total:
// }

const SlotInfo = ({
  selectedSlot = {payment_details: null},
  handleBooking,
  apiLoading,
  onClose,
  currentSlot,
}) => {
  console.log('selectedSlot', selectedSlot);
  const {payment_details: paymentDetails} = selectedSlot;
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
        <View bottom={0} minHeight={200} width={windowWidth} pb={2}>
          {paymentDetails ? (
            <VStack p={4} pt={0} mt={2}>
              <RfBold>Summary</RfBold>
              <Divider my={2} />
              <VStack px={2}>
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

          <Center minHeight={paymentDetails ? 100 : 200}>
            <View ml={6} mt={3}>
              {currentSlot ? (
                <>
                  <HStack>
                    <RfText>You already have a booking at </RfText>
                    <RfBold>{tConvert(currentSlot.slot.start_time)}</RfBold>
                  </HStack>
                  <HStack mt={0}>
                    <RfText>Do you want to reschedule it to </RfText>
                    <RfBold>{tConvert(selectedSlot.slot.start_time)} ?</RfBold>
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
                    <RfBold>{tConvert(selectedSlot?.duration)} minutes</RfBold>
                  </HStack>
                </>
              )}
            </View>
            <Center mt={4} mb={3}>
              <NeuButton
                active={!selectedSlot}
                borderRadius={8}
                height={40}
                width={windowWidth - 60}
                {...(true
                  ? {convex: true, customGradient: Colors.gradient}
                  : {})}
                onPress={handleBooking}>
                {apiLoading ? (
                  <SimpleLoader color={Colors.white} />
                ) : selectedSlot ? (
                  <RfBold color={Colors.white}>Confirm Booking</RfBold>
                ) : (
                  <RfBold color={Colors.white}>Confirm Booking</RfBold>
                )}
              </NeuButton>
            </Center>
          </Center>
        </View>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default SlotInfo;
