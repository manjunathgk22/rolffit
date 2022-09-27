import React, {useContext, useEffect, useState} from 'react';
import {Center, HStack, Icon, Image, View, VStack} from 'native-base';
import Colors from '../../../constant/Colors';
import NeuView from '../../../HOC/NeuView/NeuView';
import {
  LOGIN_DATA,
  windowHeight,
  windowWidth,
} from '../../../constant/AppConstant';
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
import GradientView from '../../../components/GradientView/GradientView';
import {openUrl} from '../../../utility/AppUtility';

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
    <GradientView style={{width: windowWidth, height: windowHeight}}>
      <View flex={1}>
        <ScrollView flex={1} showsVerticalScrollIndicator={false}>
          <View mt={4} flex={1}>
            <VStack my={5} px={6}>
              <HStack>
                <RfBold fontSize={'2xl'}>
                  welcome, {loginData?.user?.first_name}
                </RfBold>
              </HStack>
              <RfText fontSize={'lg'}>
                let's identify your office location
              </RfText>
            </VStack>
            <Center mt={4}>
              <TouchableOpacity
                // onPress={() => {
                //   setshowCoworkingModal(true);
                // }}
                style={{marginBottom: 30}}
                activeOpacity={0.8}>
                <NeuView
                  height={windowHeight / 2 > 350 ? 350 : windowHeight / 2}
                  width={windowWidth - 40}
                  borderRadius={24}>
                  <Center>
                    <Image
                      resizeMode="stretch"
                      height={windowHeight / 2 > 350 ? 350 : windowHeight / 2}
                      style={{borderRadius: 24}}
                      source={require('../../../assets/images/coworking.png')}
                    />
                  </Center>

                  {/*  */}
                </NeuView>
              </TouchableOpacity>
              {/* {isPersonalEmail(loginData?.user?.username) ? (
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
              ) : null} */}

              {/* <TouchableOpacity
                onPress={() => {
                  openEmail('collaboration@rolf.fit');
                }}
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
                      source={require('../../../assets/images/contact.png')}
                    />
                  </Center>
                </NeuView>
              </TouchableOpacity> */}
            </Center>
            <View mt={4} px={6}>
              <RfBold fontSize={'2xl'}>is your office in a</RfBold>
              <RfBold lineHeight={30} fontSize={'2xl'}>
                co-working space?
              </RfBold>
              <HStack pb={4} mt={6} space={8}>
                <NeuButton
                  onPress={() => setshowIndependentOfficeModal(true)}
                  borderRadius={24}
                  width={130}
                  height={46}>
                  <RfBold fontSize="2xl">No</RfBold>
                </NeuButton>
                <NeuButton
                  onPress={() => {
                    setshowCoworkingModal(true);
                  }}
                  borderRadius={24}
                  width={130}
                  height={46}>
                  <RfBold fontSize="2xl">Yes</RfBold>
                </NeuButton>
              </HStack>
            </View>
            {/*  */}
          </View>
        </ScrollView>
        {showCoworkingModal ? (
          <CoworkingModal onClose={() => setshowCoworkingModal(false)} />
        ) : null}
        {showIndependentOfficeModal ? (
          <GenericPopup
            onClose={() => setshowIndependentOfficeModal(false)}
            space={10}
            primaryBtnWidth={150}
            secondaryBtn={'logout'}
            onSecondaryBtnClick={handleLogout}
            {...(isPersonalEmail(loginData?.user?.username || '')
              ? {}
              : {
                  primaryBtn: 'request demo',
                  onPrimaryBtnClick: () =>
                    openUrl('https://calendly.com/rolf-fit'),
                })}
            height={isPersonalEmail(loginData?.user?.username) ? 200 : 430}
            body={() => (
              <View>
                {isPersonalEmail(loginData?.user?.username) ? (
                  <RfBold>Please login with your company email id</RfBold>
                ) : (
                  <View>
                    <RfBold mb={4} fontSize={'xl'}>
                      we are not in your office yet!!
                    </RfBold>
                    <TouchableOpacity
                      onPress={() => {
                        openUrl('https://calendly.com/rolf-fit');
                      }}
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
                            source={require('../../../assets/images/contact.png')}
                          />
                        </Center>
                      </NeuView>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            )}
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
    </GradientView>
  );
};

export default NotOurPratner;
const styles = StyleSheet.create({
  container: {
    ...constainerStyle,
    backgroundColor: 'transparent',
  },
  image: {
    height: '100%',
  },
  google: {
    height: 30,
  },
});
