import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
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
      {children}
    </LinearGradient>
  );
};

export default GradientView;
