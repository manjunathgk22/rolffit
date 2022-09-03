import {Divider, Image, Modal, View} from 'native-base';
import React, {useContext} from 'react';
import {G} from 'react-native-svg';
import Colors from '../../constant/Colors';
import {setMaintenanceData} from '../../ContextApi/GlobalContext.actions';
import {GlobalContext} from '../../ContextApi/GlobalContextProvider';
import NeuButton from '../../HOC/NeuView/NeuButton';
import {openUrl} from '../../utility/AppUtility';
import RfBold from '../RfBold/RfBold';
import RfText from '../RfText/RfText';

const Maintenance = () => {
  const {
    globalStore: {maintenance},
    globalDispatch,
  } = useContext(GlobalContext);
  return (
    <Modal backgroundColor={Colors.bg_dark} isOpen={true}>
      <Modal.Content backgroundColor={Colors.bg}>
        <View>
          <View
            backgroundColor={Colors.bg}
            flexDirection={'row'}
            p={4}
            justifyContent={'space-between'}>
            <RfBold>{maintenance.title}</RfBold>
            {maintenance.show_cross_icon ? (
              <NeuButton
                width={40}
                height={44}
                onPress={() => globalDispatch(setMaintenanceData(null))}>
                <RfBold style={{fontSize: 18}}>X</RfBold>
              </NeuButton>
            ) : null}
          </View>
          {maintenance?.title ? <Divider my={2} /> : null}
          <View p={4}>
            {maintenance.image_url ? (
              <Image
                resizeMode={'contain'}
                style={{
                  height: 100,
                  width: undefined,
                  marginBottom: 10,
                }}
                source={maintenance.image_url}
              />
            ) : null}
            <RfText>{maintenance.msg}</RfText>
            <View
              flexDirection={'row'}
              justifyContent={'space-between'}
              style={{
                marginTop: 15,
              }}>
              {maintenance.negative_button?.shouldShow ? (
                <NeuButton
                  height={40}
                  onPress={() => {
                    if (maintenance.negative_button?.action_type) {
                      openUrl(maintenance.negative_button?.action_type?.url);
                    }
                    if (maintenance.show_cross_icon) {
                      globalDispatch(setMaintenanceData(null));
                    }
                  }}>
                  <RfBold>{maintenance.negative_button.title}</RfBold>
                </NeuButton>
              ) : null}
              {maintenance.positive_button?.shouldShow ? (
                <NeuButton
                  height={40}
                  onPress={() => {
                    if (maintenance.positive_button?.action_type) {
                      openUrl(maintenance.positive_button?.action_type?.url);
                    }
                    if (maintenance.show_cross_icon) {
                      globalDispatch(setMaintenanceData(null));
                    }
                  }}>
                  <RfBold>{maintenance.positive_button.title}</RfBold>
                </NeuButton>
              ) : null}
            </View>
          </View>
        </View>
      </Modal.Content>
    </Modal>
  );
};

export default Maintenance;
