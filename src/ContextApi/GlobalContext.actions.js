import {SET_LOGIN_DATA, TEST_MUTATE} from './GlobalContext.actionTypes';

export const mutateTest = payload => {
  return {
    type: TEST_MUTATE,
    payload,
  };
};

export const setLoginData = payload => {
  return {
    type: SET_LOGIN_DATA,
    payload,
  };
};
