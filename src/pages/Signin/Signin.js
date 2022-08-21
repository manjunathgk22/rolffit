import {Box, Icon, ScrollView, Text, useToast, View, VStack} from 'native-base';
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
import {Image, StyleSheet} from 'react-native';
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

export function Signin({navigation}) {
  const {globalStore, globalDispatch} = useContext(GlobalContext);
  const [signinDisabled, setsigninDisabled] = useState(false);
  const toast = useToast();
  const errorToast = () => {
    toast.show({
      render: () => {
        return <ToastMessage text={`Something went wrong!`} />;
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
        username: '123@test.com',
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

  return (
    <View height={windowHeight} flex={1}>
      <ScrollView contentContainerStyle={styles.container} flex={1}>
        <View style={styles.container}>
          <NeuView
            style={{marginBottom: 10}}
            height={370}
            width={windowWidth - 40}
            borderRadius={12}>
            <Image
              source={require('../../assets/images/kind.png')}
              style={styles.image}
              resizeMode={'cover'}
            />
          </NeuView>
          <RfBold textAlign={'center'} fontSize={'4xl'}>
            Be kind
          </RfBold>
          <RfBold mt={-4} textAlign={'center'} fontSize={'4xl'}>
            to your mind
          </RfBold>
          <RfText fontSize={'sm'}>
            Signup with your official google account
          </RfText>
          <View mt={8}>
            <NeuButton
              width={230}
              height={50}
              onPress={signIn}
              active={signinDisabled}
              borderRadius={16}
              flexDirection={'row'}
              style={{flexDirection: 'row'}}>
              {/* <Icon size={'md'} color="rf.dark" as={AntDesign} name="google" /> */}
              <Image
                resizeMode="contain"
                style={styles.google}
                source={require(`../../assets/images/google.png`)}
              />
              <RfBold ml={0}> Sign in with Google</RfBold>
            </NeuButton>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: constainerStyle,
  image: {
    height: '100%',
  },
  google: {
    height: 30,
  },
});
