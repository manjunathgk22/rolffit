import {StackActions, CommonActions} from '@react-navigation/native';

import * as React from 'react';

/**
 * The navigation is implemented as a service so that it can be used outside of components, for example in sagas.
 *
 * @see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html
 */

// RootNavigation.js

export const navigationRef = React.createRef();

/**
 * Call this function when you want to navigate to a specific route.
 *
 * @param routeName The name of the route to navigate to. Routes are defined in RootScreen using createStackNavigator()
 * @param params Route parameters.
 */
function navigate(routeName, params) {
  // navigator.dispatch(
  //     NavigationActions.navigate({
  //         routeName,
  //         params
  //     })
  // );
  navigationRef.current?.navigate(routeName, params, Math.random() * 10000);
}
const replace = (routeName, params) => {
  navigationRef.current?.dispatch(StackActions.replace(routeName, params));
};
function pop() {
  navigationRef.current?.goBack();
}

/**
 * Call this function when you want to navigate to a specific route AND reset the navigation history.
 *
 * That means the user cannot go back. This is useful for example to redirect from a splashscreen to
 * the main screen: the user should not be able to go back to the splashscreen.
 *
 * @param routeName The name of the route to navigate to. Routes are defined in RootScreen using createStackNavigator()
 * @param params Route parameters.
 */
function navigateAndReset(routeName, params = {}, action = {}) {
  try {
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{name: routeName}],
    });
    navigationRef.current?.dispatch(resetAction);
  } catch (error) {
    console.log(error.toString());
  }
}

export default {
  navigate,
  navigateAndReset,
  pop,
  replace,
};
