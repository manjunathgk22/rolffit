import {Actionsheet, Center, HStack, View, VStack} from 'native-base';
import React, {useState} from 'react';
import GradientView from '../../../components/GradientView/GradientView';
import Loader from '../../../components/Loader/Loader';
import RfBold from '../../../components/RfBold/RfBold';
import RfText from '../../../components/RfText/RfText';
import {windowWidth} from '../../../constant/AppConstant';
import Colors from '../../../constant/Colors';
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
      NavigationService.navigate(routes.BookedScreen, {
        selectedSlot: newSlot,
      });
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
          <Center width={windowWidth} background={Colors.bg} height={300}>
            <GradientView style={{width: windowWidth, height: 300}}>
              <Loader />
            </GradientView>
          </Center>
        ) : (
          <NeuView height={300} width={windowWidth}>
            <VStack my={8}>
              <HStack>
                <RfText>You already have a booking at </RfText>
                <RfBold>{tConvert(currentSlot.slot.start_time)}</RfBold>
              </HStack>
              <HStack mt={0}>
                <RfText>Do you want to reschedule it to </RfText>
                <RfBold>{tConvert(newSlot.slot.start_time)}</RfBold>
              </HStack>
              <Center mt={6}>
                <NeuButton
                  convex={true}
                  customGradient={Colors.gradient}
                  onPress={onReschedule}
                  height={44}
                  width={150}>
                  <RfBold color={Colors.white}>Reschedule</RfBold>
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
