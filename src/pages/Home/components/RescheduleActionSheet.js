import {Actionsheet, Center, HStack, View, VStack} from 'native-base';
import React, {useState} from 'react';
import Loader from '../../../components/Loader/Loader';
import RfBold from '../../../components/RfBold/RfBold';
import RfText from '../../../components/RfText/RfText';
import {windowWidth} from '../../../constant/AppConstant';
import NeuButton from '../../../HOC/NeuView/NeuButton';
import NeuView from '../../../HOC/NeuView/NeuView';
import NavigationService from '../../../Navigator/NavigationService';
import routes from '../../../Navigator/routes';
import {tConvert} from '../../../utility/AppUtility';
import {rescheduleApiHelper} from '../apiService';

const RescheduleActionSheet = ({
  open,
  onClose,
  errorToast,
  currentSlot,
  newSlot,
}) => {
  const [rescheduleState, setrescheduleState] = useState({});
  const onReschedule = async () => {
    setrescheduleState({
      ...rescheduleState,
      loading: true,
    });
    const json = {
      reschedule_slot_session_data: {
        // therapist_id: 1,
        slot_session_id: newSlot.id,
      },
      cancel_slot_data: {
        slot_booking_id: currentSlot.slot_booking_id,
      },
    };
    const response = await rescheduleApiHelper(json);
    if (response) {
      onClose();
      NavigationService.navigate(routes.BookedScreen);
    } else {
      errorToast('Something went wrong');
    }
    setrescheduleState({
      ...rescheduleState,
      loading: false,
    });
  };
  return (
    <Actionsheet hideDragIndicator isOpen={open} onClose={onClose}>
      <Actionsheet.Content padding={0}>
        {rescheduleState.loading ? (
          <Center height={300}>
            <Loader />
          </Center>
        ) : (
          <NeuView height={300} width={windowWidth}>
            <VStack my={8}>
              <HStack>
                <RfText>You already have a booking at </RfText>
                <RfBold>{tConvert(currentSlot.slot.start_time)}</RfBold>
              </HStack>
              <HStack>
                <RfText>Do you want to reschedult it to </RfText>
                <RfBold>{tConvert(newSlot.slot.start_time)}</RfBold>
              </HStack>
              <Center mt={6}>
                <NeuButton onPress={onReschedule} height={40} width={120}>
                  <RfBold>Reschedule</RfBold>
                </NeuButton>
              </Center>
            </VStack>
          </NeuView>
        )}
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default RescheduleActionSheet;
