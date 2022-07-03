import {Text} from 'native-base';
import React, {Fragment, useContext, useEffect, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
// import {NeuView} from 'react-native-neu-element';
import {initApiClients} from '../../api/apiRequest';
import Appnavigator from '../../Appnavigator';
import {LOGIN_DATA} from '../../constant/AppConstant';
import Colors from '../../constant/Colors';
import {setLoginData} from '../../ContextApi/GlobalContext.actions';
import {GlobalContext} from '../../ContextApi/GlobalContextProvider';
import {printLog} from '../../utility/AppUtility';
import {getData} from '../../utility/StorageUtility';
import NeuView from '../../HOC/NeuView/NeuView';
import {constainerStyle} from '../../utility/Styles';

function SplashScreen() {
  const [render, setrender] = useState(false);
  const {globalStore, globalDispatch} = useContext(GlobalContext);
  useEffect(() => {
    getLoginData();
    setTimeout(() => {
      setrender(true);
    }, 4000);
  }, []);

  const getLoginData = async () => {
    const res = await getData({key: LOGIN_DATA});
    printLog('data', res);
    initApiClients();
    globalDispatch(setLoginData(res));
  };

  return !render ? (
    <View style={styles.colCenter}>
      <NeuView color={Colors.bg} height={350} width={350} borderRadius={16}>
        <Image
          resizeMode={'contain'}
          style={{width: '200%', height: '200%'}}
          source={require('../../assets/images/logo_animation_black.gif')}
          alt="logo"
        />
      </NeuView>
    </View>
  ) : (
    <Fragment>
      <Appnavigator />
    </Fragment>
  );
}

export default SplashScreen;
const styles = StyleSheet.create({
  colCenter: constainerStyle,
});
