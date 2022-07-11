import React from 'react';
import {Actionsheet, HStack, VStack} from 'native-base';
import NeuView from '../../../../HOC/NeuView/NeuView';
import {windowWidth} from '../../../../constant/AppConstant';
import RfBold from '../../../../components/RfBold/RfBold';
import NeuButton from '../../../../HOC/NeuView/NeuButton';
import RfText from '../../../../components/RfText/RfText';

const LogoutActionSheet = ({showLogout, setshowLogout, handleLogout}) => {
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
