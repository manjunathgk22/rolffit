import {
  GET_SLOTS,
  GET_SLOTS_SUCCESS,
  GET_SLOTS_FAILURE,
  GET_FUTURE_BOOKING,
  GET_FUTURE_BOOKING_SUCCESS,
  GET_FUTURE_BOOKING_FAILURE,
} from './Home.actionTypes';

export const getSlots = payload => ({
  type: GET_SLOTS,
  payload,
});

export const getSlotsSuccess = payload => ({
  type: GET_SLOTS_SUCCESS,
  payload,
});

export const getSlotsFailure = payload => ({
  type: GET_SLOTS_FAILURE,
  payload,
});

export const getFutureBooking = payload => ({
  type: GET_FUTURE_BOOKING,
  payload,
});
export const getFutureBookingSuccess = payload => ({
  type: GET_FUTURE_BOOKING_SUCCESS,
  payload,
});
export const getFutureBookingFailure = payload => ({
  type: GET_FUTURE_BOOKING_FAILURE,
  payload,
});
