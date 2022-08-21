import {
  Actionsheet,
  Center,
  HStack,
  Icon,
  Image,
  useToast,
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
import {LOGIN_DATA} from '../../../constant/AppConstant';
import Colors from '../../../constant/Colors';
import {setLoginData} from '../../../ContextApi/GlobalContext.actions';
import {GlobalContext} from '../../../ContextApi/GlobalContextProvider';
import NeuButton from '../../../HOC/NeuView/NeuButton';
import NeuInput from '../../../HOC/NeuView/NeuInput';
import NavigationService from '../../../Navigator/NavigationService';
import routes from '../../../Navigator/routes';
import {storeData} from '../../../utility/StorageUtility';
import {Ionicons} from '@native-base/icons';

const CoworkingModal = ({onClose}) => {
  const [loading, setloading] = useState(false);
  const [value, setvalue] = useState('');
  const [errorMsg, seterrorMsg] = useState(null);
  const {globalStore, globalDispatch} = useContext(GlobalContext);

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
      <Actionsheet.Content background={Colors.bg} padding={'0 10px'}>
        {loading ? (
          <Center width={'100%'} background={Colors.bg} minHeight={300}>
            <Loader />
          </Center>
        ) : (
          <Center background={Colors.bg} p={2}>
            <Image
              resizeMode="contain"
              height={320}
              // style={{borderRadius: 12}}
              source={require('../../../assets/images/code.png')}
            />

            <HStack space={5} mb={8} mt={4}>
              <NeuInput
                textStyle={{fontSize: 20}}
                borderRadius={10}
                inputProps={{
                  keyboardType: 'number',
                  // autoFocus: true,
                  color: Colors.dark,
                  textAlign: 'center',
                  placeholder: 'Enter code',
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
                  borderRadius={'50%'}
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
          </Center>
        )}
      </Actionsheet.Content>
    </Actionsheet>
  );
};

export default CoworkingModal;
