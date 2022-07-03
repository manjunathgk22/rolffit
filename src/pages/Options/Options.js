import {
  Actionsheet,
  Box,
  Button,
  Center,
  Divider,
  HStack,
  Icon,
  Image,
  Text,
  View,
  VStack,
} from 'native-base';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {GlobalContext} from '../../ContextApi/GlobalContextProvider';
import {printLog} from '../../utility/AppUtility';
import {Ionicons, AntDesign} from '@native-base/icons';
import Colors from '../../constant/Colors';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {setLoginData} from '../../ContextApi/GlobalContext.actions';
import {removeData, storeData} from '../../utility/StorageUtility';
import {LOGIN_DATA, windowWidth} from '../../constant/AppConstant';
import routes from '../../Navigator/routes';
import NeuView from '../../HOC/NeuView/NeuView';
import RfBold from '../../components/RfBold/RfBold';
import RfText from '../../components/RfText/RfText';
import NeuButton from '../../HOC/NeuView/NeuButton';
import {constainerStyle} from '../../utility/Styles';
import NavigationService from '../../Navigator/NavigationService';
function Options({navigation}) {
  const btnRef = useRef(null);
  const [showLogout, setshowLogout] = useState(false);
  const [userData, setuserData] = useState('');
  const {
    globalStore: {loginData},
    globalDispatch,
  } = useContext(GlobalContext);

  useEffect(() => {
    printLog('qq', loginData);
    setuserData(loginData?.user);
  }, [loginData]);

  useEffect(() => {
    const styleObj = {
      backgroundColor: Colors.error,
      borderColor: Colors.error,
      borderWidth: 1,
      borderRadius: 4,
    }; //@ts-ignore
    printLog(btnRef);
    if (btnRef.current) {
      btnRef?.current?.setNativeProps?.({
        style: styleObj,
      });
    }
  }, [btnRef]);

  const handleLogout = async () => {
    printLog('xx111');
    await removeData({key: LOGIN_DATA});
    printLog('xx222');
    globalDispatch(setLoginData(null));
    printLog('xx333');
    navigation.reset({
      index: 0,
      routes: [{name: routes.Signin}],
    });
  };

  return userData ? (
    <>
      <VStack mt={4} p={4} flex={1} style={styles.container}>
        <Center>
          <NeuView height={150} borderRadius={150} width={150}>
            <Image
              size={140}
              borderRadius={100}
              source={{
                uri: userData.photo_url,
              }}
              alt="Alternate Text"
            />
          </NeuView>
          <RfBold mt={4}>{userData.first_name}</RfBold>
          <RfText>{userData.username}</RfText>
        </Center>
        {/* <Divider mt={4} thickness={2} />
        <Box flexDirection={'row'} alignItems={'center'} mt={4}>
          <Icon size={'xs'} color="light.700" as={AntDesign} name="book" />
          <Text ml={2}>My bookings</Text>
        </Box>
        <Divider mt={4} thickness={2} />
        <TouchableOpacity
          onPress={() => {
            setshowLogout(true);
          }}>
          <Box flexDirection={'row'} alignItems={'center'} mt={4}>
            <Icon size={'xs'} color="rose.400" as={AntDesign} name="logout" />
            <Text ml={2}>Log Out</Text>
          </Box>
        </TouchableOpacity>
        <Divider mt={4} thickness={2} /> */}

        <View position={'absolute'} right={5} top={0}>
          <NeuButton
            onPress={() => {
              setshowLogout(true);
            }}
            height={40}
            width={40}
            borderRadius={50}>
            <Icon as={AntDesign} name="logout" color={Colors.dark} />
          </NeuButton>
        </View>
      </VStack>
      <Actionsheet
        hideDragIndicator
        isOpen={showLogout}
        onClose={() => {
          setshowLogout(false);
        }}>
        <Actionsheet.Content padding={0}>
          <NeuView height={300} width={windowWidth}>
            <VStack my={8}>
              <RfBold>Are you sure you want to logout?</RfBold>
              <HStack mt={4} justifyContent={'space-around'}>
                <NeuButton
                  onPress={() => {
                    setshowLogout(false);
                  }}
                  height={50}>
                  <RfText>Cancel</RfText>
                </NeuButton>
                <NeuButton onPress={handleLogout} height={50}>
                  <RfBold>Logout</RfBold>
                </NeuButton>
              </HStack>
            </VStack>
          </NeuView>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  ) : null;
}

export default Options;

const styles = StyleSheet.create({
  container: {
    ...constainerStyle,
    justifyContent: 'flex-start',
  },
});
