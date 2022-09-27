import {
  Center,
  Divider,
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
    if (!response?.error) {
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
    <NeuView
      height={booking.message ? 195 : 145}
      borderRadius={8}
      width={windowWidth - 40}>
      <Center p={3} flex={1}>
        <HStack flex={1}>
          <View height={'100%'} flex={6}>
            <VStack flex={1}>
              <RfText mt={2} textAlign={'left'}>
                {booking.title}
              </RfText>

              <HStack alignItems={'baseline'}>
                <RfBold>{booking.description}</RfBold>
              </HStack>
              {true ? (
                <HStack alignSelf={'flex-start'} mt={4}>
                  <NeuButton
                    onPress={() => setshowCancelPopup(true)}
                    borderRadius={6}
                    height={35}
                    width={110}>
                    <RfBold>Cancel</RfBold>
                  </NeuButton>
                </HStack>
              ) : null}
            </VStack>
          </View>
          <Center flex={3}>
            <Image
              flex={1}
              resizeMode="contain"
              source={require('../../assets/images/timer.png')}
            />
          </Center>
        </HStack>
        {booking.message ? (
          <VStack mt={4}>
            {/* <Divider width={windowWidth - 40} bg={Colors.white} /> */}
            <RfText>{booking.message}</RfText>
          </VStack>
        ) : null}
      </Center>
      {showCancelPopup ? (
        <GenericPopup
          onClose={() => {
            setshowCancelPopup(false);
          }}
          space={6}
          onSecondaryBtnClick={() => setshowCancelPopup(false)}
          onPrimaryBtnClick={handleCancel}
          title="Are you sure you want to cancel?"
          primaryBtn={'Yes'}
          secondaryBtn={'No'}
        />
      ) : null}
    </NeuView>
  );
};

export default FutureBookingCard;
