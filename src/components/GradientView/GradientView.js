import {Image, View} from 'native-base';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {windowHeight, windowWidth} from '../../constant/AppConstant';
import Colors from '../../constant/Colors';

const GradientView = ({
  gradient = Colors.darkGradient,
  borderRadius = 0,
  children,
  style = {},
}) => {
  return (
    <LinearGradient
      colors={gradient}
      useAngle={true}
      angle={145}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      style={{
        borderRadius,
        ...style,
      }}>
      <View elevation={1} zIndex={1} flex={1}>
        {children}
      </View>
      <Image
        position={'absolute'}
        left={-(windowWidth / 2) - 15}
        top={0}
        source={require('../../assets/images/signinBackground.png')}
        height={300}
        resizeMode={'contain'}
      />
      <Image
        position={'absolute'}
        bottom={0}
        source={require('../../assets/images/signinBackground1.png')}
        height={300}
        resizeMode={'contain'}
      />
    </LinearGradient>
  );
};

export default GradientView;
