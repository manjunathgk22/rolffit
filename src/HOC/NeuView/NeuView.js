import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, ViewPropTypes} from 'react-native';
import Shadow from './Shadow';

import {hexToHsl, hslToHex} from './utils';

import LinearGradient from 'react-native-linear-gradient';
import Colors from '../../constant/Colors';

const NeuView = props => {
  const {
    color = Colors.bg,
    width = 100,
    height = 100,
    radius = 0,
    children,
    customLightShadow = {},
    customDarkShadow = {},
    customInsetLightShadow = {},
    customInsetDarkShadow = {},
    customGradient = Colors.darkGradient,
    borderRadius = 0,
    inset,
    convex,
    concave,
    style = {},
    containerStyle,
    noShadow,
  } = props;

  const {h, s, l} = hexToHsl(color);
  const light = hslToHex(h - 2 < 0 ? 0 : h - 2, s, l + 5 > 100 ? 100 : l + 5);
  const dark = hslToHex(h, s, l - 20 < 0 ? 0 : l - 20);
  const mid = hslToHex(h, s, l - 5 < 0 ? 0 : l - 5);

  const lightSetting = {
    width,
    height,
    blur: 10,
    spread: 0,
    borderRadius,
    radius,
    color: inset ? dark : light,
    offsetX: inset ? -2 : -4,
    offsetY: inset ? -2 : -4,
    opacity: 1,
    ...customLightShadow,
  };

  const darkSetting = {
    width,
    height,
    blur: 10,
    spread: 0,
    radius,
    color: inset ? light : dark,
    borderRadius,
    offsetX: inset ? 2 : 3,
    offsetY: inset ? 2 : 3,
    opacity: 1,
    ...customDarkShadow,
  };

  const insetLightSetting = {
    width,
    height,
    blur: 5,
    spread: 0,
    borderRadius,
    radius,
    color: dark,
    offsetX: -3,
    offsetY: -3,
    opacity: 1,
    ...customInsetDarkShadow,
  };

  const insetDarkSetting = {
    width: width + 2,
    height: height + 2,
    blur: 5,
    spread: 1,
    radius,
    color: light,
    borderRadius,
    offsetX: 0,
    offsetY: 0,
    opacity: 1,
    ...customInsetLightShadow,
  };

  const styles = StyleSheet.create({
    container: {
      position: 'relative',
    },
    view: {
      width,
      height,
      borderRadius,
      backgroundColor: color,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const renderComposed = children => {
    if (concave) {
      return (
        <>
          <LinearGradient
            colors={customGradient ? customGradient.reverse() : [mid, light]}
            useAngle={true}
            angle={145}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{
              borderRadius,
              ...style,
            }}>
            <View
              style={{
                ...styles.view,
                ...containerStyle,
                backgroundColor: 'transparent',
              }}>
              {children}
            </View>
          </LinearGradient>
        </>
      );
    }

    if (convex || true) {
      return (
        <>
          <LinearGradient
            colors={customGradient ? customGradient : [light, mid]}
            useAngle={true}
            angle={180}
            angleCenter={{x: 0.5, y: 0.5}}
            style={{
              borderRadius,
              ...style,
            }}>
            <View
              style={{
                ...styles.view,
                ...containerStyle,
                backgroundColor: 'transparent',
              }}>
              {children}
            </View>
          </LinearGradient>
        </>
      );
    }

    return (
      <>
        <View
          style={{
            ...styles.view,
            ...containerStyle,
            ...style,
          }}>
          {children}
        </View>
      </>
    );
  };

  return (
    <View
      style={{
        ...styles.container,
        ...style,
      }}>
      {!noShadow && (
        <>
          <Shadow setting={inset ? insetDarkSetting : lightSetting} />
          <Shadow setting={inset ? insetLightSetting : darkSetting} />
        </>
      )}
      {renderComposed(children)}
    </View>
  );
};

// NeuView.propTypes = {
//   color: PropTypes.string.isRequired,
//   width: PropTypes.number.isRequired,
//   height: PropTypes.number.isRequired,
//   radius: PropTypes.number,
//   customLightShadow: ViewPropTypes,
//   customDarkShadow: ViewPropTypes,
//   borderRadius: PropTypes.number,
//   customGradient: PropTypes.array,
//   style: ViewPropTypes,
//   containerStyle: ViewPropTypes,
//   inset: PropTypes.bool,
//   convex: PropTypes.bool,
//   concave: PropTypes.bool,
//   noShadow: PropTypes.bool,
// };

export default NeuView;
