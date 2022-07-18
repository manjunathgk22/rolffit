import produce from 'immer';
import {
  GET_FUTURE_BOOKING,
  GET_FUTURE_BOOKING_FAILURE,
  GET_FUTURE_BOOKING_SUCCESS,
  GET_SLOTS,
  GET_SLOTS_FAILURE,
  GET_SLOTS_SUCCESS,
  GET_THERAPIST_SLOTS,
  GET_THERAPIST_SLOTS_FAILURE,
  GET_THERAPIST_SLOTS_SUCCESS,
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
        draft.slotsData.data = {};
        draft.slotsData.loading = false;
        draft.slotsData.error = true;
        return draft;
      });
    case GET_FUTURE_BOOKING:
      return produce(state, draft => {
        draft.futureBookings.loading = true;
        draft.futureBookings.error = null;
        draft.futureBookings.data = null;
        return draft;
      });
    case GET_FUTURE_BOOKING_SUCCESS:
      return produce(state, draft => {
        draft.futureBookings.data = action.payload;
        draft.futureBookings.loading = false;
        draft.futureBookings.error = null;
        return draft;
      });
    case GET_FUTURE_BOOKING_FAILURE:
      return produce(state, draft => {
        draft.futureBookings.data = null;
        draft.futureBookings.loading = false;
        draft.futureBookings.error = true;
        return draft;
      });

    case GET_THERAPIST_SLOTS:
      return produce(state, draft => {
        draft.therapistData.loading = true;
        draft.therapistData.error = null;

        return draft;
      });
    case GET_THERAPIST_SLOTS_SUCCESS:
      return produce(state, draft => {
        draft.therapistData.data = action.payload;
        draft.therapistData.loading = false;
        draft.therapistData.error = null;
        return draft;
      });
    case GET_THERAPIST_SLOTS_FAILURE:
      return produce(state, draft => {
        draft.therapistData.data = {};
        draft.therapistData.loading = false;
        draft.therapistData.error = true;
        return draft;
      });
  }
};
