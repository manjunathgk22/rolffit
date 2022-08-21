import React, {useContext, useEffect, useState} from 'react';
import {Center, HStack, Icon, Image, View, VStack} from 'native-base';
import Colors from '../../../constant/Colors';
import NeuView from '../../../HOC/NeuView/NeuView';
import {LOGIN_DATA, windowWidth} from '../../../constant/AppConstant';
import NeuButton from '../../../HOC/NeuView/NeuButton';
import RfBold from '../../../components/RfBold/RfBold';
import {constainerStyle} from '../../../utility/Styles';
import {ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {removeData} from '../../../utility/StorageUtility';
import {setLoginData} from '../../../ContextApi/GlobalContext.actions';
import {GlobalContext} from '../../../ContextApi/GlobalContextProvider';
import routes from '../../../Navigator/routes';
import NeuInput from '../../../HOC/NeuView/NeuInput';
import NeuBorderView from '../../../HOC/NeuView/NeuBorderView';
import {AntDesign} from '@native-base/icons';
import Loader from '../../../components/Loader/Loader';
import AnimatedLottieView from 'lottie-react-native';
import RfText from '../../../components/RfText/RfText';
import {sendEvent} from '../util';
import {NOT_OUR_PARTNER} from '../../../constant/analyticsConstant';
import CoworkingModal from './CoworkingModal';
import GenericPopup from '../../../components/GenericPopup/GenericPopup';
import {isPersonalEmail, openEmail} from '../../../utility/emailUtil';

const NotOurPratner = ({navigation}) => {
  const [showCoworkingModal, setshowCoworkingModal] = useState(false);
  const [showIndependentOfficeModal, setshowIndependentOfficeModal] =
    useState(false);
  const {
    globalStore: {loginData},
    globalDispatch,
  } = useContext(GlobalContext);

  useEffect(() => {
    sendEvent({event: NOT_OUR_PARTNER});
  }, []);

  const handleLogout = async () => {
    await removeData({key: LOGIN_DATA});
    globalDispatch(setLoginData(null));
    navigation.reset({
      index: 0,
      routes: [{name: routes.Signin}],
    });
  };
  return (
    // not our customer flow
    <View backgroundColor={Colors.bg} flex={1}>
      <ScrollView flex={1}>
        <View mt={4} flex={1} backgroundColor={Colors.bg}>
          <VStack my={5} px={6}>
            <HStack>
              <RfBold>Welcome, {loginData?.user?.first_name}</RfBold>
            </HStack>
            <RfText>We were not able to identify you.</RfText>
          </VStack>
          <Center>
            <TouchableOpacity
              onPress={() => {
                setshowCoworkingModal(true);
              }}
              style={{marginBottom: 30}}
              activeOpacity={0.8}>
              <NeuView height={220} width={windowWidth - 40} borderRadius={12}>
                <Center>
                  <Image
                    resizeMode="stretch"
                    height={220}
                    style={{borderRadius: 12}}
                    source={require('../../../assets/images/cowork.png')}
                  />
                </Center>
                {/*  */}
              </NeuView>
            </TouchableOpacity>
            {isPersonalEmail(loginData?.user?.username) ? (
              <TouchableOpacity
                onPress={handleLogout}
                style={{marginBottom: 30}}
                activeOpacity={0.8}>
                <NeuView
                  height={220}
                  width={windowWidth - 40}
                  borderRadius={12}>
                  <Center>
                    <Image
                      resizeMode="stretch"
                      height={220}
                      style={{borderRadius: 12}}
                      source={require('../../../assets/images/independent.png')}
                    />
                  </Center>
                </NeuView>
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity
              onPress={() => {
                openEmail('collaboration@rolf.fit');
              }}
              style={{marginBottom: 30}}
              activeOpacity={0.8}>
              <NeuView height={220} width={windowWidth - 40} borderRadius={12}>
                <Center>
                  <Image
                    resizeMode="stretch"
                    height={220}
                    style={{borderRadius: 12}}
                    source={require('../../../assets/images/contact.png')}
                  />
                </Center>
              </NeuView>
            </TouchableOpacity>
          </Center>
          {/*  */}
        </View>
      </ScrollView>
      {showCoworkingModal ? (
        <CoworkingModal onClose={() => setshowCoworkingModal(false)} />
      ) : null}
      {showIndependentOfficeModal ? (
        <GenericPopup
          onSelect={handleLogout}
          title="lorem epsum"
          onClose={() => setshowIndependentOfficeModal(false)}
          primaryBtn="Continue"
          space={10}
        />
      ) : null}
      {/* <View position={'absolute'} right={4} top={4}>
        <NeuButton
          onPress={handleLogout}
          height={40}
          width={40}
          borderRadius={50}>
          <Icon as={AntDesign} name="logout" color={Colors.dark} />
        </NeuButton>
      </View> */}
    </View>
  );
};

export default NotOurPratner;
const styles = StyleSheet.create({
  container: constainerStyle,
  image: {
    height: '100%',
  },
  google: {
    height: 30,
  },
});
