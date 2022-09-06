/* eslint-disable react-native/no-inline-styles */
import {
  Box,
  Center,
  HStack,
  Icon,
  Image,
  ScrollView,
  Text,
  useToast,
  View,
  VStack,
} from 'native-base';
import React, {useContext, useEffect, useState} from 'react';
import {mutateTest, setLoginData} from '../../ContextApi/GlobalContext.actions';
import {GlobalContext} from '../../ContextApi/GlobalContextProvider';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {printLog, sendFCMTokenHelper} from '../../utility/AppUtility';
import Loader from '../../components/Loader/Loader';
import {createUser} from './apiService';
import Colors from '../../constant/Colors';
import {
  getData,
  removeSingleData,
  storeData,
} from '../../utility/StorageUtility';
import {
  BUSINESS_PARTNER_ID,
  LOGIN_DATA,
  windowHeight,
  windowWidth,
} from '../../constant/AppConstant';
import NavigationService from '../../Navigator/NavigationService';
import routes from '../../Navigator/routes';
import {initApiClients} from '../../api/apiRequest';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import {constainerStyle} from '../../utility/Styles';
import NeuView from '../../HOC/NeuView/NeuView';
import {AntDesign} from '@native-base/icons';
import RfBold from '../../components/RfBold/RfBold';
import NeuButton from '../../HOC/NeuView/NeuButton';
import RfText from '../../components/RfText/RfText';
import ToastMessage from '../../components/ToastMessage/ToastMessage';
import {sendEvent} from '../Home/util';
import {
  LAND_ON_SIGNIN,
  SIGNIN_FAIL,
  SIGNIN_SUCCESS,
} from '../../constant/analyticsConstant';
import one from '../../assets/images/1.png';
import two from '../../assets/images/2.png';
import three from '../../assets/images/3.png';
import four from '../../assets/images/4.png';
import five from '../../assets/images/5.png';
import six from '../../assets/images/6.png';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import GradientView from '../../components/GradientView/GradientView';
import {getGeomanistRegular} from '../../utility/fontUtility';

const images = {
  // 1: one,
  2: two,
  3: three,
  4: four,
  5: five,
  6: six,
};

export function Signin({navigation}) {
  const {globalStore, globalDispatch} = useContext(GlobalContext);
  const [signinDisabled, setsigninDisabled] = useState(false);
  const [apiLoading, setapiLoading] = useState(false);
  const [activeslide, setactiveslide] = useState(0);
  const toast = useToast();
  const errorToast = () => {
    toast.show({
      render: () => {
        return <ToastMessage text={'Something went wrong!'} />;
      },
    });
  };

  useEffect(() => {
    sendEvent({event: LAND_ON_SIGNIN});
  }, []);

  const signIn = async () => {
    if (signinDisabled) return;
    try {
      setsigninDisabled(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // store it in global for analytics
      global.userData = userInfo.user;
      printLog(userInfo.user);
      sendEvent({event: SIGNIN_SUCCESS});
      setapiLoading(true);
      const businessPartner = await getData({key: BUSINESS_PARTNER_ID});
      console.log('dynamiclinnk6666333', businessPartner);
      const res = await createUser({
        username: userInfo.user?.email,
        first_name: userInfo.user?.name,
        photo_url: userInfo.user?.photo,
        ...(businessPartner ? {unique_code: +businessPartner} : {}),
      });
      if (businessPartner) {
        removeSingleData({key: BUSINESS_PARTNER_ID});
      }
      // printLog('qwqwqw', res);
      if (res) {
        await storeData({key: LOGIN_DATA, value: res});
        globalDispatch(setLoginData(res));
        await initApiClients();
        NavigationService.replace(routes.HomeScreen);
        sendFCMTokenHelper();
      } else {
        errorToast();
      }
      setapiLoading(false);

      // globalDispatch(setLoginData(userInfo.user));
    } catch (error) {
      sendEvent({event: SIGNIN_FAIL});
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        printLog('user cancelled the login flow');
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        printLog('operation (e.g. sign in) is in progress already');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        printLog('play services not available or outdated');
      } else {
        // some other error happened
        printLog('some other error happened', error);
      }
      console.log(error);
    } finally {
      setsigninDisabled(false);
    }
  };

  const _renderItem = ({item}) => {
    console.log(item);
    return (
      <Center maxHeight={500}>
        <Image
          maxHeight={500}
          borderRadius={12}
          source={item}
          style={styles.image}
          resizeMode={'contain'}
        />
      </Center>
    );
  };

  // const pagination = () => {
  //   // const {entries, activeSlide} = this.state;
  //   return (
  //     <Pagination
  //       dotsLength={Object.values(images).length}
  //       activeDotIndex={activeslide}
  //       // containerStyle={{backgroundColor: 'rgba(0, 0, 0, 0.75)'}}
  //       dotStyle={{
  //         width: 10,
  //         height: 10,
  //         borderRadius: 5,
  //         marginHorizontal: 8,
  //         backgroundColor: 'rgba(255, 255, 255, 1)',
  //         border: `1px solid ${Colors.dark}`,
  //       }}
  //       inactiveDotStyle={{
  //         width: 8,
  //         height: 8,
  //         borderRadius: 5,
  //         marginHorizontal: 8,
  //         backgroundColor: Colors.dark,
  //         // Define styles for inactive dots here
  //       }}
  //       inactiveDotOpacity={0.4}
  //       inactiveDotScale={0.6}
  //     />
  //   );
  // };

  return (
    <GradientView style={{height: windowHeight, width: windowWidth}}>
      <View mt={-4} height={windowHeight} flex={1}>
        <Image
          position={'absolute'}
          left={-(windowWidth / 2) - 15}
          top={0}
          source={require('../../assets/images/signinBackground.png')}
          height={300}
          // width={undefined}
          resizeMode={'contain'}
        />
        <Image
          position={'absolute'}
          // left={windowWidth / 2}
          // right={0}
          bottom={0}
          source={require('../../assets/images/signinBackground1.png')}
          height={300}
          // width={undefined}
          resizeMode={'contain'}
        />
        <ScrollView
          style={{zIndex: 10, elevation: 10}}
          contentContainerStyle={styles.container}
          flex={1}>
          <Center flex={1}>
            <View
              width={windowWidth}
              style={{
                ...styles.container,
                borderRadius: 0,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <NeuView borderRadius={12} height={180} width={windowWidth - 40}>
                <Center flex={1}>
                  <VStack
                    alignItems={'center'}
                    // backgroundColor={Colors.blue}
                    mt={6}>
                    <VStack mt={4}>
                      <RfBold
                        fontSize={30}
                        width={150}
                        style={{
                          fontFamily: getGeomanistRegular(),
                        }}
                        flexWrap={'wrap'}
                        // position={'absolute'}
                        alignSelf={'center'}
                        textAlign={'center'}
                        ml={20}>
                        greetings
                      </RfBold>
                      <RfBold
                        fontSize={30}
                        width={150}
                        style={{
                          fontFamily: getGeomanistRegular(),
                        }}
                        flexWrap={'wrap'}
                        // position={'absolute'}
                        alignSelf={'center'}
                        textAlign={'center'}
                        mt={-4}
                        ml={20}>
                        from
                      </RfBold>
                    </VStack>

                    <Image
                      source={require('../../assets/images/logosingleline.png')}
                      height={185}
                      style={{marginTop: -77}}
                      width={undefined}
                      resizeMode={'contain'}
                    />
                  </VStack>
                </Center>
              </NeuView>
              {/* <Center flex={1}> */}
              <View mt={10}>
                <NeuView
                  borderRadius={12}
                  height={220}
                  width={windowWidth - 40}>
                  <View height={220} overflow={'hidden'}>
                    <Center width={windowWidth - 40}>
                      <HStack alignItems={'center'}>
                        <View
                          flex={1}
                          height={220}
                          // backgroundColor={Colors.blue}
                          mt={-4}
                          justifyContent={'center'}
                          width={
                            (windowWidth - 30) / 3 + (windowWidth - 30) / 3
                          }
                          // background={Colors.blue}
                          alignItems={'center'}>
                          <RfBold
                            textAlign={'center'}
                            fontSize={30}
                            color={Colors.white}
                            maxWidth={200}
                            style={{
                              fontFamily: getGeomanistRegular(),
                              lineHeight: 32,
                            }}
                            flexWrap={'wrap'}>
                            we provide mini massage breaks during your office
                            time!
                          </RfBold>
                        </View>
                        <Image
                          source={require('../../assets/images/relax_and_login.png')}
                          height={250}
                          mt={2}
                          mr={2}
                          width={(windowWidth - 30) / 3}
                          // width={undefined}
                          resizeMode={'contain'}
                        />
                      </HStack>
                    </Center>
                  </View>
                </NeuView>
              </View>
              {/* </Center> */}
              <View mt={10}>
                <View>
                  <NeuButton
                    customGradient={Colors.gradient}
                    // inset
                    // convex
                    // active
                    onPress={signIn}
                    style={{position: 'relative'}}
                    height={80}
                    borderRadius={80}
                    width={80}>
                    <Center position={'absolute'}>
                      {/* <Image
                        source={require('../../assets/images/google.png')}
                        style={{height: 32, width: 32}}
                        resizeMode={'contain'}
                      /> */}
                      <Icon
                        size={30}
                        as={AntDesign}
                        name="google"
                        color={Colors.white}
                      />
                    </Center>
                  </NeuButton>
                </View>

                {/* </NeuView> */}
              </View>
              <VStack>
                <RfText textAlign={'center'} mt={2}>
                  Tap to login with your
                </RfText>
                <RfBold textAlign={'center'}>company email id</RfBold>
              </VStack>
            </View>
          </Center>
        </ScrollView>
        {signinDisabled ? (
          <Center
            position={'absolute'}
            flex={1}
            width={'100%'}
            height={'100%'}
            style={{zIndex: 15, elevation: 15}}
            borderRadius={12}
            background={'#000000dd'}>
            <View>
              <View height={50} mt={6}>
                {/* <Loader /> */}
              </View>
              <RfBold fontSize={'2xl'} textAlign={'center'} letterSpacing={1}>
                Signing you in...
              </RfBold>
            </View>
          </Center>
        ) : null}
      </View>
    </GradientView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    justifyContent: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    borderRadius: 0,
  },
  image: {
    width: windowWidth - 30,
    height: '100%',
    aspectRatio: 1075 / 1350,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  google: {
    height: 30,
  },
});
