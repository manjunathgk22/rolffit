import {
  Actionsheet,
  Box,
  Button,
  Divider,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from 'native-base';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {GlobalContext} from '../../ContextApi/GlobalContextProvider';
import {printLog} from '../../utility/AppUtility';
import {Ionicons, AntDesign} from '@native-base/icons';
import Colors from '../../constant/Colors';
import {TouchableOpacity} from 'react-native';
import {setLoginData} from '../../ContextApi/GlobalContext.actions';
import {removeData, storeData} from '../../utility/StorageUtility';
import {LOGIN_DATA} from '../../constant/AppConstant';
import routes from '../../Navigator/routes';

function Options({navigation}) {
  const btnRef = useRef(null);
  const [showLogout, setshowLogout] = useState(false);
  const {
    globalStore: {loginData},
    globalDispatch,
  } = useContext(GlobalContext);

  useEffect(() => {
    printLog('qq', loginData);
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
    await removeData({key: LOGIN_DATA});
    globalDispatch(setLoginData(null));
    navigation.reset({
      index: 0,
      routes: [{name: routes.Signin}],
    });
  };

  return loginData ? (
    <>
      <VStack p={4} flex={1}>
        <HStack space={'md'}>
          <Image
            size={50}
            borderRadius={100}
            source={{
              uri: loginData.photo,
            }}
            alt="Alternate Text"
          />
          <VStack>
            <Text fontSize={'lg'} fontWeight={'semibold'}>
              {loginData.name}
            </Text>
            <Text>{loginData.email}</Text>
          </VStack>
        </HStack>
        <Divider mt={4} thickness={2} />
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
        <Divider mt={4} thickness={2} />
      </VStack>
      <Actionsheet
        isOpen={showLogout}
        onClose={() => {
          setshowLogout(false);
        }}>
        <Actionsheet.Content>
          <VStack my={8}>
            <Text fontSize={'xl'} fontWeight={'semibold'} mt={4} mb={8}>
              Are you sure you want to logout?
            </Text>
            <HStack justifyContent={'center'}>
              <TouchableOpacity
                onPress={() => {
                  setshowLogout(false);
                }}>
                <Box
                  borderWidth={1}
                  borderRadius={4}
                  borderColor={Colors.border}
                  py={2}
                  px={8}>
                  <Text>Cancel</Text>
                </Box>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleLogout}>
                <Box
                  ml={6}
                  borderWidth={1}
                  borderRadius={4}
                  borderColor={Colors.error}
                  backgroundColor={Colors.error}
                  py={2}
                  px={8}>
                  <Text color={Colors.white}>Logout</Text>
                </Box>
              </TouchableOpacity>
            </HStack>
          </VStack>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  ) : null;
}

export default Options;
