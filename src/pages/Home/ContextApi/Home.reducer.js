import produce from 'immer';
import {SET_LOGIN_DATA, TEST_MUTATE} from './Home.actionTypes';

export const homeContextReducer = (state, action) => {
  switch (action.type) {
    case TEST_MUTATE:
      return {
        ...state,
        testData: action.payload,
      };
    case SET_LOGIN_DATA:
      return produce(state, draft => {
        draft.loginData = action.payload;
        return draft;
      });
  }
};
