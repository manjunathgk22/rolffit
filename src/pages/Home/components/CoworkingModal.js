import {
  Actionsheet,
  Center,
  HStack,
  Icon,
  useToast,
  View,
  VStack,
} from 'native-base';
import React, {useContext, useState} from 'react';
import {
  callAPIs,
  initApiClients,
  setUniqueCode,
  STATUS,
} from '../../../api/apiRequest';
import Loader from '../../../components/Loader/Loader';
import RfBold from '../../../components/RfBold/RfBold';
import RfText from '../../../components/RfText/RfText';
import ToastMessage from '../../../components/ToastMessage/ToastMessage';
import {
  LOGIN_DATA,
  windowHeight,
  windowWidth,
} from '../../../constant/AppConstant';
import Colors from '../../../constant/Colors';
import {setLoginData} from '../../../ContextApi/GlobalContext.actions';
import {GlobalContext} from '../../../ContextApi/GlobalContextProvider';
import NeuButton from '../../../HOC/NeuView/NeuButton';
import NeuInput from '../../../HOC/NeuView/NeuInput';
import NavigationService from '../../../Navigator/NavigationService';
import routes from '../../../Navigator/routes';
import {storeData} from '../../../utility/StorageUtility';
import {Ionicons} from '@native-base/icons';
import {Platform, ScrollView, Image} from 'react-native';
import {useKeyboard} from '../../../hooks/useKeyboard';
import NeuView from '../../../HOC/NeuView/NeuView';

const CoworkingModal = ({onClose}) => {
  const [loading, setloading] = useState(false);
  const [value, setvalue] = useState('');
  const [errorMsg, seterrorMsg] = useState(null);
  const {globalStore, globalDispatch} = useContext(GlobalContext);
  const keyboardHeight = useKeyboard();

  const handleRegister = async () => {
    if (value.length !== 4) {
      return;
    }
    setloading(true);
    const response = await callAPIs(
      setUniqueCode({
        unique_code: +value,
      }),
    );
    if (response.status !== STATUS.ERROR) {
      storeData({key: LOGIN_DATA, value: response.data});
      globalDispatch(setLoginData(response.data));
      await initApiClients();
      NavigationService.replace(routes.HomeScreen);
      setloading(false);
    } else {
      setloading(false);
      // onClose();
      console.log('popop', response);
      seterrorMsg(response?.data?.error?.message || 'Something went wrong!');
    }
  };

  return (
    <Actionsheet isOpen={true} onClose={onClose}>
      <Actionsheet.Content maxHeight={windowHeight} background={Colors.bg_dark}>
        <ScrollView>
          {loading ? (
            <View px={6} minHeight={200} background={Colors.bg_dark}>
              <Loader />
            </View>
          ) : (
            <View px={6} background={Colors.bg_dark}>
              <Image
                resizeMode="contain"
                style={{
                  borderRadius: 24,
                  height: windowWidth - 60,
                  width: windowWidth - 60,
                }}
                source={require('../../../assets/images/code1.png')}
              />

              <View my={4}>
                <RfBold fontSize={'2xl'}>enter RF-CODE</RfBold>
                <RfText>displayed outside our setup area</RfText>
              </View>

              <HStack
                space={5}
                pb={4}
                mb={8}
                mt={4}
                style={{
                  marginBottom: keyboardHeight ? keyboardHeight + 0 : 0,
                }}>
                <NeuInput
                  textStyle={{fontSize: 20}}
                  borderRadius={10}
                  inputProps={{
                    keyboardType:
                      Platform.OS === 'ios' ? 'numeric' : 'number-pad',
                    // autoFocus: true,
                    color: Colors.dark,
                    placeholderTextColor: Colors.dark,
                    textAlign: 'center',
                    placeholder: 'enter code',
                  }}
                  value={value}
                  onChangeText={text => {
                    seterrorMsg(null);
                    text = text.replace(/[^0-9]/g, '');
                    text = text.substr(0, 4);
                    setvalue(text);
                  }}
                  width={150}
                  height={44}
                />
                <HStack mt={-1}>
                  <NeuButton
                    {...(value.length === 4
                      ? {
                          convex: true,
                          customGradient: Colors.gradient,
                        }
                      : {})}
                    height={45}
                    width={45}
                    borderRadius={45}
                    onPress={handleRegister}>
                    <Icon
                      as={Ionicons}
                      size={8}
                      name="ios-chevron-forward"
                      color={value.length === 4 ? Colors.white : Colors.dark}
                    />
                  </NeuButton>
                </HStack>
              </HStack>
              {errorMsg ? (
                <VStack>
                  <RfText color={'rf.error'}>{errorMsg}</RfText>
                </VStack>
              ) : null}
            </View>
          )}
        </ScrollView>
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default CoworkingModal;
