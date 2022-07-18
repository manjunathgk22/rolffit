import React, {useContext} from 'react';
import {Actionsheet, HStack, VStack} from 'native-base';
import NeuView from '../../../../HOC/NeuView/NeuView';
import {LOGIN_DATA, windowWidth} from '../../../../constant/AppConstant';
import RfBold from '../../../../components/RfBold/RfBold';
import NeuButton from '../../../../HOC/NeuView/NeuButton';
import RfText from '../../../../components/RfText/RfText';
import {removeData} from '../../../../utility/StorageUtility';
import {GlobalContext} from '../../../../ContextApi/GlobalContextProvider';
import {setLoginData} from '../../../../ContextApi/GlobalContext.actions';
import routes from '../../../../Navigator/routes';

const LogoutActionSheet = ({showLogout, setshowLogout, navigation}) => {
  const {globalDispatch} = useContext(GlobalContext);

  const handleLogout = async () => {
    await removeData({key: LOGIN_DATA});
    globalDispatch(setLoginData(null));
    navigation.reset({
      index: 0,
      routes: [{name: routes.Signin}],
    });
  };
  return (
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
            <HStack mt={8} justifyContent={'space-around'}>
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
  );
};

export default LogoutActionSheet;
