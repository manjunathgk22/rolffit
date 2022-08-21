import {
  Center,
  HStack,
  Icon,
  Image,
  Text,
  useToast,
  View,
  VStack,
} from 'native-base';
import React, {useState} from 'react';
import {windowWidth} from '../../constant/AppConstant';
import Colors from '../../constant/Colors';
import NeuView from '../../HOC/NeuView/NeuView';
import RfBold from '../RfBold/RfBold';
import RfText from '../RfText/RfText';
import {AntDesign} from '@native-base/icons';
import GradientText from '../GradientText/GradientText';
import NeuBorderView from '../../HOC/NeuView/NeuBorderView';
import NeuButton from '../../HOC/NeuView/NeuButton';
import {rescheduleApiHelper} from '../../pages/Home/apiService';
import ToastMessage from '../ToastMessage/ToastMessage';
import Loader from '../Loader/Loader';
import GenericPopup from '../GenericPopup/GenericPopup';
import moment from 'moment';

const FutureBookingCard = ({time, getData, booking}) => {
  console.log('qwqw', booking.slot_session.slot_start_time);
  const [loading, setloading] = useState(false);
  const [showCancelPopup, setshowCancelPopup] = useState(false);
  const toast = useToast();
  const handleCancel = async () => {
    setloading(true);
    setshowCancelPopup(false);
    const json = {
      cancel_slot_data: {
        slot_booking_id: booking.id,
      },
    };

    const response = await rescheduleApiHelper(json);
    if (response) {
      getData?.();
    } else {
      toast.show({
        render: () => {
          return <ToastMessage text={'something went wrong'} />;
        },
      });
    }
    setloading(false);
  };

  return (
    <NeuView height={140} borderRadius={8} width={windowWidth - 40}>
      <Center>
        <VStack>
          <View
            // background={Colors.error}
            flex={1}
            alignItems={'flex-end'}
            width={windowWidth - 40}>
            {/* <Image
              // background={Colors.darker}
              resizeMode="contain"
              width={220}
              height={120}
              source={require('../../assets/images/upcoming.png')}
            /> */}
            <View width={windowWidth - 40} mt={3}>
              <Center>
                <NeuView borderRadius={8} height={60} width={windowWidth - 60}>
                  <HStack px={5} alignItems={'center'} flex={1} width={'100%'}>
                    <NeuView height={38} width={38} borderRadius={8}>
                      <Icon
                        as={AntDesign}
                        name="calendar"
                        color={Colors.dark}
                      />
                    </NeuView>
                    <View>
                      <RfText ml={5}>Upcoming booking </RfText>
                      <HStack alignItems={'baseline'}>
                        <GradientText
                          ml={5}
                          fontWeight={'bold'}
                          fontSize={'lg'}
                          colors={Colors.gradient.reverse()}>
                          {time}
                        </GradientText>
                        <RfText ml={2} fontSize="sm">
                          {moment(booking.slot_session.slot_start_time).format(
                            'Do MMM',
                          )}
                        </RfText>
                      </HStack>
                    </View>
                  </HStack>
                </NeuView>
                <Center mt={4}>
                  {loading ? (
                    <HStack>
                      <Loader size={38} />
                    </HStack>
                  ) : (
                    <NeuButton
                      onPress={() => {
                        setshowCancelPopup(true);
                      }}
                      borderRadius={6}
                      height={35}
                      width={110}>
                      <RfText>Cancel</RfText>
                    </NeuButton>
                  )}
                </Center>
              </Center>
            </View>
          </View>
        </VStack>
      </Center>
      {showCancelPopup ? (
        <GenericPopup
          onClose={() => {
            setshowCancelPopup(false);
          }}
          onSelect={handleCancel}
          title="Are you sure you want to cancel?"
          primaryBtn={'Yes'}
          secondaryBtn={'No'}
        />
      ) : null}
    </NeuView>
  );
};

export default FutureBookingCard;
