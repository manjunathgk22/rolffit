import {
  GET_SLOTS,
  GET_SLOTS_SUCCESS,
  GET_SLOTS_FAILURE,
  GET_FUTURE_BOOKING,
  GET_FUTURE_BOOKING_SUCCESS,
  GET_FUTURE_BOOKING_FAILURE,
  GET_THERAPIST_SLOTS,
  GET_THERAPIST_SLOTS_SUCCESS,
  GET_THERAPIST_SLOTS_FAILURE,
  GET_MAIN_LIST_CARD,
  MAIN_LIST_CARD_SUCCESS,
  MAIN_LIST_CARD_FAILURE,
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

export const getMainCard = payload => ({
  type: GET_MAIN_LIST_CARD,
  payload,
});
export const getMainCardSuccess = payload => ({
  type: MAIN_LIST_CARD_SUCCESS,
  payload,
});
export const getMainCardFailure = payload => ({
  type: MAIN_LIST_CARD_FAILURE,
  payload,
});

export const getTherapistSlots = payload => ({
  type: GET_THERAPIST_SLOTS,
  payload,
});

export const getTherapistSlotsSuccess = payload => ({
  type: GET_THERAPIST_SLOTS_SUCCESS,
  payload,
});

export const getTherapistSlotsFailure = payload => ({
  type: GET_THERAPIST_SLOTS_FAILURE,
  payload,
});
