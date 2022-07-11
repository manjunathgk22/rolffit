import {
  GET_MY_BOOKINGS,
  GET_MY_BOOKINGS_SUCCESS,
  GET_MY_BOOKINGS_FAILURE,
} from './Options.actionTypes';

export const getMybooking = payload => ({
  type: GET_MY_BOOKINGS,
  payload,
});

export const getMybookingSuccess = payload => ({
  type: GET_MY_BOOKINGS_SUCCESS,
  payload,
});

export const getMybookingFailure = payload => ({
  type: GET_MY_BOOKINGS_FAILURE,
  payload,
});
