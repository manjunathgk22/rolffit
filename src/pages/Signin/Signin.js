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
import {printLog} from '../../utility/AppUtility';
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
import {StyleSheet, TouchableOpacity} from 'react-native';
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
    try {
      setsigninDisabled(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // store it in global for analytics
      global.userData = userInfo.user;
      printLog(userInfo.user);
      sendEvent({event: SIGNIN_SUCCESS});
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
        storeData({key: LOGIN_DATA, value: res});
        globalDispatch(setLoginData(res));
        await initApiClients();
        NavigationService.replace(routes.HomeScreen);
      } else {
        errorToast();
      }
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
          // maxHeight={500}
          borderRadius={12}
          source={item}
          style={styles.image}
          resizeMode={'contain'}
        />
      </Center>
    );
  };

  const pagination = () => {
    // const {entries, activeSlide} = this.state;
    return (
      <Pagination
        dotsLength={Object.values(images).length}
        activeDotIndex={activeslide}
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
      />
    );
  };

  return (
    <View height={windowHeight} flex={1}>
      <ScrollView contentContainerStyle={styles.container} flex={1}>
        <View style={styles.container}>
          <View mt={4} maxHeight={650}>
            <Center maxHeight={460}>
              <Carousel
                layout={'default'}
                data={Object.values(images)}
                renderItem={_renderItem}
                sliderWidth={Math.round(windowWidth)}
                itemWidth={Math.round(windowWidth)}
                autoplay={true}
                autoplayDelay={1200}
                autoplayInterval={5000}
                loop={true}
                enableSnap={true}
                firstItem={0}
                loopClonesPerSide={Object.values(images).length}
                onSnapToItem={index => setactiveslide(index)}
              />
            </Center>
            <Center mt={-3}>{pagination()}</Center>

            {/* <Center>
              <HStack>
                <RfBold>
                  {activeslide + 1}/{Object.values(images).length}
                </RfBold>
              </HStack>
            </Center> */}
          </View>
          <VStack mt={-2}>
            <NeuView height={230} width={windowWidth - 30} borderRadius={12}>
              <Center>
                {/* <Image
                  mt={-4}
                  height={90}
                  resizeMode={'contain'}
                  source={require('../../assets/images/logosingleline.png')}
                />
                <RfText color={Colors.dark} textAlign={'center'} fontSize={16}>
                  Login with your official google account
                </RfText>
                <View mt={4}>
                  <NeuButton
                    width={250}
                    height={50}
                    onPress={signIn}
                    active={signinDisabled}
                    borderRadius={16}
                    flexDirection={'row'}
                    style={{flexDirection: 'row'}}>
                    <HStack>
                      <Image
                        resizeMode="contain"
                        width={25}
                        style={styles.google}
                        source={require(`../../assets/images/google.png`)}
                      />
                      <RfBold ml={2}> Enter Relax Mode</RfBold>
                    </HStack>
                  </NeuButton>
                </View> */}
                <TouchableOpacity onPress={signIn} activeOpacity={0.7}>
                  <Image
                    source={require('../../assets/images/signin.png')}
                    resizeMode={'stretch'}
                    width={windowWidth - 30}
                    borderRadius={12}
                    height={230}
                    style={{aspectRatio: 1917 / 1080}}
                  />
                </TouchableOpacity>
              </Center>
            </NeuView>
          </VStack>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...constainerStyle,
    marginTop: 0,
    justifyContent: 'flex-start',
  },
  image: {
    width: windowWidth,
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
