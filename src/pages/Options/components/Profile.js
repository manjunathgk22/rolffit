import React, {useContext, useState, useEffect} from 'react';
import {Center, Image, Text} from 'native-base';
import RfBold from '../../../components/RfBold/RfBold';
import RfText from '../../../components/RfText/RfText';
import Colors from '../../../constant/Colors';
import {GlobalContext} from '../../../ContextApi/GlobalContextProvider';
import NeuView from '../../../HOC/NeuView/NeuView';

function Profile() {
  const {
    globalStore: {loginData},
    globalDispatch,
  } = useContext(GlobalContext);
  const [userData, setuserData] = useState('');
  useEffect(() => {
    if (loginData) {
      const [firstname, secondname] = loginData?.user.first_name?.split(' ');
      const dispName = `${firstname.charAt(0)}${
        secondname ? secondname?.charAt(0) : ''
      }`;
      setuserData({
        ...(loginData?.user ? loginData.user : {}),
        dispName,
      });
    }
  }, [loginData]);
  return (
    <Center mt={20}>
      <NeuView height={150} borderRadius={150} width={150}>
        {userData.photo_url ? (
          <Image
            size={140}
            borderRadius={100}
            source={{
              uri: userData.photo_url,
            }}
            alt="Alternate Text"
          />
        ) : (
          <NeuView inset height={130} borderRadius={130} width={130}>
            <Text
              color={Colors.dark}
              style={{fontFamily: 'Geomanist-Bold'}}
              textTransform={'uppercase'}
              fontSize={'6xl'}>
              {userData.dispName}
            </Text>
          </NeuView>
        )}
      </NeuView>
      <RfBold fontSize={'3xl'} textTransform={'uppercase'} mt={4}>
        {userData.first_name}
      </RfBold>
      <RfText>{userData.username}</RfText>
    </Center>
  );
}

export default Profile;
