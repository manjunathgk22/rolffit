import {
  GET_SLOTS,
  GET_SLOTS_SUCCESS,
  GET_SLOTS_FAILURE,
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
