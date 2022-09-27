import {
  Center,
  HStack,
  Icon,
  Image,
  Input,
  ScrollView,
  Text,
  View,
  VStack,
} from 'native-base';
import React, {useContext, useState} from 'react';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';
import NeuButton from '../../HOC/NeuView/NeuButton';
import {constainerStyle} from '../../utility/Styles';
import {AntDesign} from '@native-base/icons';
import Colors from '../../constant/Colors';
import RfBold from '../../components/RfBold/RfBold';
import RfText from '../../components/RfText/RfText';
import routes from '../../Navigator/routes';
import LottieView from 'lottie-react-native';
import {tConvert} from '../../utility/AppUtility';
import NeuView from '../../HOC/NeuView/NeuView';
import {
  LOGIN_DATA,
  windowHeight,
  windowWidth,
} from '../../constant/AppConstant';
import GradientView from '../../components/GradientView/GradientView';
import MainCard from '../../components/MainCard/MainCard';
import NeuInput from '../../HOC/NeuView/NeuInput';
import {useKeyboard} from '../../hooks/useKeyboard';
import {Ionicons} from '@native-base/icons';
import {GlobalContext} from '../../ContextApi/GlobalContextProvider';
import {storeData} from '../../utility/StorageUtility';
import {createUser} from '../Signin/apiService';
import {setLoginData} from '../../ContextApi/GlobalContext.actions';
import {initApiClients} from '../../api/apiRequest';
import Loader from '../../components/Loader/Loader';

const BookedScreen = ({navigation, route: {params}}) => {
  const [phoneNumber, setphoneNumber] = useState('');
  const {selectedSlot, cards} = params || {};
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState('');
  const {
    globalStore: {
      loginData: {user},
    },
    globalDispatch,
  } = useContext(GlobalContext);

  const keyboardHeight = useKeyboard();

  const handlePhoneNumber = async () => {
    if (!/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/.test(phoneNumber)) {
      seterror('invalid phone number');
      return;
    }
    setloading(true);
    const json = {
      username: user.username,
      mobile_no: phoneNumber,
    };
    const res = await createUser(json);
    await storeData({key: LOGIN_DATA, value: res});
    globalDispatch(setLoginData(res));
    await initApiClients();
    setloading(false);
    navigation.navigate(routes.HomeScreen);
  };
  return (
    <GradientView style={{height: windowHeight, width: windowWidth}}>
      <VStack width={windowWidth} flex={1} style={styles.container}>
        <ScrollView flex={1} showsVerticalScrollIndicator={false}>
          <View width={windowWidth}>
            <Center mt={cards?.length ? 10 : 32} mb={4}>
              <NeuView borderRadius={12} width={windowWidth - 40} height={400}>
                <Image
                  resizeMode="contain"
                  height={180}
                  source={require('../../assets/images/booked.png')}
                />
                <RfBold mt={4} fontSize="3xl">
                  Congratulation
                </RfBold>
                <HStack
                  maxWidth={windowWidth - 40}
                  flexWrap={'wrap'}
                  justifyContent={'center'}
                  textAlign="center"
                  mt={2}>
                  <RfText>You have booked a session at </RfText>
                  <RfBold>{tConvert(selectedSlot?.slot.start_time)}</RfBold>
                </HStack>
                <VStack mt={8}>
                  <NeuButton
                    onPress={() => navigation.navigate(routes.HomeScreen)}
                    convex={true}
                    customGradient={Colors.gradient}
                    height={40}
                    width={180}
                    borderRadius={8}>
                    <RfBold color={Colors.white}>Continue</RfBold>
                  </NeuButton>
                </VStack>
              </NeuView>

              {cards?.length ? (
                <View mt={10} mb={keyboardHeight + 40}>
                  <KeyboardAvoidingView behavior="padding">
                    <MainCard
                      height={260}
                      item={cards[0]}
                      jsx={() => (
                        <View>
                          {loading ? (
                            <Loader />
                          ) : (
                            <VStack>
                              <HStack alignItems={'center'} space={6}>
                                <NeuInput
                                  borderRadius={12}
                                  value={phoneNumber}
                                  onChangeText={text => {
                                    seterror(null);
                                    text = text.replace(/[^0-9]/g, '');
                                    text = text.substr(0, 10);
                                    setphoneNumber(text);
                                  }}
                                  inputProps={{
                                    keyboardType:
                                      Platform.OS === 'ios'
                                        ? 'numeric'
                                        : 'number-pad',
                                    // autoFocus: true,
                                    color: Colors.dark,
                                    placeholderTextColor: Colors.dark,
                                    textAlign: 'center',
                                    placeholder: 'enter mobile number',
                                  }}
                                  color={Colors.blue}
                                  height={40}
                                  width={200}
                                />
                                <NeuButton
                                  {...(phoneNumber.length === 10
                                    ? {
                                        convex: true,
                                        customGradient:
                                          cards[0]?.ui?.background?.colors?.reverse() ||
                                          Colors.gradient,
                                      }
                                    : {})}
                                  height={50}
                                  width={50}
                                  onPress={handlePhoneNumber}
                                  borderRadius={50}>
                                  <Icon
                                    as={Ionicons}
                                    size={7}
                                    name="ios-chevron-forward"
                                    color={
                                      phoneNumber.length === 10
                                        ? Colors.white
                                        : Colors.dark
                                    }
                                  />
                                </NeuButton>
                              </HStack>
                              {error ? (
                                <RfText color={Colors.error}>{error}</RfText>
                              ) : null}
                            </VStack>
                          )}
                        </View>
                      )}
                    />
                  </KeyboardAvoidingView>
                </View>
              ) : null}
            </Center>
          </View>
        </ScrollView>
      </VStack>
    </GradientView>
  );
};

export default BookedScreen;

const styles = StyleSheet.create({
  container: {
    ...constainerStyle,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
  },
});
