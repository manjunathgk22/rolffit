import produce from 'immer';
import {
  GET_MY_BOOKINGS,
  GET_MY_BOOKINGS_FAILURE,
  GET_MY_BOOKINGS_SUCCESS,
} from './Options.actionTypes';

export const optionsContextReducer = (state, action) => {
  switch (action.type) {
    case GET_MY_BOOKINGS:
      return produce(state, draft => {
        draft.myBookings.loading = true;
        draft.myBookings.error = null;
        draft.myBookings.data = null;
        return draft;
      });
    case GET_MY_BOOKINGS_SUCCESS:
      return produce(state, draft => {
        draft.myBookings.data = action.payload;
        draft.myBookings.loading = false;
        draft.myBookings.error = null;
        return draft;
      });
    case GET_MY_BOOKINGS_FAILURE:
      return produce(state, draft => {
        draft.myBookings.data = null;
        draft.myBookings.loading = false;
        draft.myBookings.error = true;
        return draft;
      });
    default:
      return state;
  }
};
