import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Center,
  Divider,
  HStack,
  Icon,
  Image,
  ScrollView,
  Text,
  useToast,
  View,
  VStack,
} from 'native-base';
import {GlobalContext} from '../../ContextApi/GlobalContextProvider';
import {AntDesign} from '@native-base/icons';
import {Ionicons} from '@native-base/icons';
import Colors from '../../constant/Colors';
import {StyleSheet} from 'react-native';
import {setLoginData} from '../../ContextApi/GlobalContext.actions';
import {removeData} from '../../utility/StorageUtility';
import {
  LOGIN_DATA,
  windowHeight,
  windowWidth,
} from '../../constant/AppConstant';
import routes from '../../Navigator/routes';
import NeuButton from '../../HOC/NeuView/NeuButton';
import {constainerStyle} from '../../utility/Styles';
import LogoutActionSheet from './components/LogoutActionSheet/LogoutActionSheet';
import Profile from './components/Profile';
import MyBookings from './components/MyBookings/MyBookings';
import OptionsProvider, {OptionsContext} from './ContextApi/OptionsProvider';
import RfBold from '../../components/RfBold/RfBold';
import GradientView from '../../components/GradientView/GradientView';
import NeuSpinner from '../../HOC/NeuView/NeuSpinner';
import Loader from '../../components/Loader/Loader';
import {callAPIs, deleteAccount, STATUS} from '../../api/apiRequest';
import ToastMessage from '../../components/ToastMessage/ToastMessage';

function Options({navigation}) {
  const [showLogout, setshowLogout] = useState(false);
  const {globalDispatch} = useContext(GlobalContext);
  const [apiLoading, setapiLoading] = useState(false);
  const {
    optionsStore: {
      myBookings: {data, loading, error},
    },
    optionsDispatch,
  } = useContext(OptionsContext);
  const toast = useToast();
  const errorToast = msg => {
    toast.show({
      render: () => {
        return <ToastMessage viewProps={{p: 2}} text={msg} />;
      },
    });
  };

  const handleDeleteAccount = async () => {
    setapiLoading(true);

    const response = await callAPIs(deleteAccount());
    if (response.status === STATUS.SUCCESS) {
      await removeData({key: LOGIN_DATA});
      globalDispatch(setLoginData(null));
      navigation.reset({
        index: 0,
        routes: [{name: routes.Signin}],
      });
    } else {
      errorToast('Something went wrong!');
    }
    setapiLoading(false);
  };

  return (
    <GradientView style={{height: windowHeight, width: windowWidth}}>
      <VStack
        width={windowWidth}
        // mt={4}
        // p={4}
        flex={1}
        style={styles.container}>
        <ScrollView>
          <Profile />
          {/* <Divider backgroundColor={Colors.dark} mt={4} thickness={0.5} /> */}
          <MyBookings />
          <View
            justifyContent={'center'}
            alignItems={'center'}
            my={data ? 6 : windowHeight - 455}
            py={10}>
            <NeuButton
              onPress={handleDeleteAccount}
              height={44}
              width={windowWidth - 60}>
              {apiLoading ? (
                <Loader indicatorColor={Colors.error} />
              ) : (
                <RfBold color={Colors.error}>Delete Account</RfBold>
              )}
            </NeuButton>
          </View>
        </ScrollView>
        <View
          flexDirection={'row'}
          justifyContent={'space-between'}
          position={'absolute'}
          // left={5}
          width={'100%'}
          // background={Colors.bg}
          pt={4}
          // top={4}
        >
          <HStack ml={5} alignItems={'center'}>
            <NeuButton
              onPress={() => {
                navigation.pop();
              }}
              height={40}
              width={40}
              borderRadius={50}>
              <Icon
                as={Ionicons}
                size={8}
                name="ios-chevron-back"
                color={Colors.dark}
              />
            </NeuButton>
            <RfBold ml={3}>Account details</RfBold>
          </HStack>
          <VStack mr={5}>
            <NeuButton
              onPress={() => {
                setshowLogout(true);
              }}
              height={40}
              width={40}
              borderRadius={50}>
              <Icon as={AntDesign} name="logout" color={Colors.dark} />
            </NeuButton>
          </VStack>
        </View>
      </VStack>
      <LogoutActionSheet
        showLogout={showLogout}
        setshowLogout={setshowLogout}
        navigation={navigation}
      />
    </GradientView>
  );
}
const WrappedOptions = props => (
  <OptionsProvider>
    <Options {...props} />
  </OptionsProvider>
);
export default WrappedOptions;

const styles = StyleSheet.create({
  container: {
    ...constainerStyle,
    backgroundColor: 'transparent',
    justifyContent: 'flex-start',
  },
});
