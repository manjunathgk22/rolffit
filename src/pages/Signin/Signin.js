import {Box, Icon, Text, useToast, View} from 'native-base';
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
import {storeData} from '../../utility/StorageUtility';
import {LOGIN_DATA} from '../../constant/AppConstant';
import NavigationService from '../../Navigator/NavigationService';
import routes from '../../Navigator/routes';
import {initApiClients} from '../../api/apiRequest';
import {StyleSheet} from 'react-native';
import {constainerStyle} from '../../utility/Styles';
import NeuView from '../../HOC/NeuView/NeuView';
import {AntDesign} from '@native-base/icons';
import RfBold from '../../components/RfBold/RfBold';
import NeuButton from '../../HOC/NeuView/NeuButton';
import RfText from '../../components/RfText/RfText';
import ToastMessage from '../../components/ToastMessage/ToastMessage';
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

  const signIn = async () => {
    try {
      setsigninDisabled(true);
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      printLog(userInfo.user);
      const res = await createUser({
        username: userInfo.user?.email,
        first_name: userInfo.user?.name,
        photo_url: userInfo.user?.photo,
      });
      if (res) {
        storeData({key: LOGIN_DATA, value: res});
        globalDispatch(setLoginData(userInfo.user));
        await initApiClients();
        NavigationService.replace(routes.HomeScreen);
      } else {
        errorToast();
      }
      // globalDispatch(setLoginData(userInfo.user));
    } catch (error) {
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
    } finally {
      setsigninDisabled(false);
      errorToast();
    }
  };

  return (
    <View style={styles.container}>
      {/* <NeuView width={300}> */}
      <RfBold mb={6}>Login with official Google account</RfBold>
      {/* </NeuView> */}
      {/* <GoogleSigninButton
        style={{width: 192, height: 48}}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
        disabled={signinDisabled}
      /> */}
      <NeuButton
        width={230}
        height={50}
        onPress={signIn}
        active={signinDisabled}
        borderRadius={16}
        flexDirection={'row'}
        style={{flexDirection: 'row'}}>
        <Icon size={'sm'} color="rf.dark" as={AntDesign} name="google" />
        <Text ml={2}>Sign in with Google</Text>
      </NeuButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: constainerStyle,
});
