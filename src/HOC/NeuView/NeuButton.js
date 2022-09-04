import React, {useState} from 'react';
import {TouchableWithoutFeedback, Text, View} from 'react-native';
import NeuView from './NeuView';
import PropTypes from 'prop-types';

const NeuButton = ({
  children,
  isConvex,
  active,
  noPressEffect,
  onPressIn,
  onPressOut,
  onPress,
  onLongPress,
  accessibilityRole,
  accessibilityStates,
  accessibilityLabel,
  testID,
  borderRadius = 8,
  ...props
}) => {
  const [toggleEffect, setToggleEffect] = useState(false);

  const pressOut = () => {
    if (noPressEffect) {
      return;
    }
    if (active) {
      return setToggleEffect(true);
    }
    if (onPressOut) {
      onPressOut();
    }
    setToggleEffect(false);
  };

  const pressIn = () => {
    if (noPressEffect) {
      return;
    }
    if (active) {
      return setToggleEffect(false);
    }
    if (onPressIn) {
      onPressIn();
    }
    setToggleEffect(true);
  };

  if (isConvex) {
    return (
      <TouchableWithoutFeedback
        onPressOut={pressOut}
        onPressIn={pressIn}
        onPress={onPress}
        onLongPress={onLongPress}
        accessibilityRole={accessibilityRole}
        accessibilityStates={accessibilityStates}
        accessibilityLabel={accessibilityLabel}
        testID={testID}>
        <View>
          <NeuView
            {...props}
            borderRadius={borderRadius}
            concave={noPressEffect ? false : active ? true : toggleEffect}
            convex={noPressEffect ? false : active ? false : !toggleEffect}>
            {children}
          </NeuView>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPressOut={pressOut}
      onPressIn={pressIn}
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityRole={accessibilityRole}
      accessibilityStates={accessibilityStates}
      accessibilityLabel={accessibilityLabel}
      testID={testID}>
      <View>
        <NeuView
          {...props}
          borderRadius={borderRadius}
          inset={noPressEffect ? false : active ? active : toggleEffect}>
          {children}
        </NeuView>
      </View>
    </TouchableWithoutFeedback>
  );
};

NeuButton.propTypes = {
  isConvex: PropTypes.bool,
  active: PropTypes.bool,
  // color: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  noPressEffect: PropTypes.bool,
  onPress: PropTypes.func,
  onPressIn: PropTypes.func,
  onPressOut: PropTypes.func,
  children: PropTypes.node,
  ...NeuView.propTypes,
};

export default NeuButton;
