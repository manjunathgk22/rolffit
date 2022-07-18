import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  Center,
  Divider,
  Icon,
  Image,
  ScrollView,
  Text,
  View,
  VStack,
} from 'native-base';
import {GlobalContext} from '../../ContextApi/GlobalContextProvider';
import {AntDesign} from '@native-base/icons';
import Colors from '../../constant/Colors';
import {StyleSheet} from 'react-native';
import {setLoginData} from '../../ContextApi/GlobalContext.actions';
import {removeData} from '../../utility/StorageUtility';
import {LOGIN_DATA, windowWidth} from '../../constant/AppConstant';
import routes from '../../Navigator/routes';
import NeuButton from '../../HOC/NeuView/NeuButton';
import {constainerStyle} from '../../utility/Styles';
import LogoutActionSheet from './components/LogoutActionSheet/LogoutActionSheet';
import Profile from './components/Profile';
import MyBookings from './components/MyBookings/MyBookings';
import OptionsProvider from './ContextApi/OptionsProvider';

function Options({navigation}) {
  const [showLogout, setshowLogout] = useState(false);
  const {globalDispatch} = useContext(GlobalContext);

  return (
    <>
      <VStack
        width={windowWidth}
        mt={4}
        // p={4}
        flex={1}
        style={styles.container}>
        <ScrollView>
          <Profile />
          <Divider backgroundColor={Colors.dark} mt={4} thickness={0.5} />
          <MyBookings />
        </ScrollView>
        <View position={'absolute'} left={5} top={0}>
          <NeuButton
            onPress={() => {
              navigation.pop();
            }}
            height={40}
            width={40}
            borderRadius={50}>
            <Icon as={AntDesign} name="arrowleft" color={Colors.dark} />
          </NeuButton>
        </View>

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
      <LogoutActionSheet
        showLogout={showLogout}
        setshowLogout={setshowLogout}
        navigation={navigation}
      />
    </>
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
    justifyContent: 'flex-start',
  },
});
