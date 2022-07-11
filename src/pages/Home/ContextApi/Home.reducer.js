import produce from 'immer';
import {
  GET_SLOTS,
  GET_SLOTS_FAILURE,
  GET_SLOTS_SUCCESS,
} from './Home.actionTypes';

export const homeContextReducer = (state, action) => {
  switch (action.type) {
    case GET_SLOTS:
      return produce(state, draft => {
        draft.slotsData.loading = true;
        draft.slotsData.error = null;
        return draft;
      });
    case GET_SLOTS_SUCCESS:
      return produce(state, draft => {
        draft.slotsData.data = action.payload;
        draft.slotsData.loading = false;
        draft.slotsData.error = null;
        return draft;
      });
    case GET_SLOTS_FAILURE:
      return produce(state, draft => {
        draft.slotsData.data = null;
        draft.slotsData.loading = false;
        draft.slotsData.error = true;
        return draft;
      });
  }
};
