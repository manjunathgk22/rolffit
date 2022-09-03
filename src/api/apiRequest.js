import axios from 'axios';
import axiosRetry from 'axios-retry';
import {getBuildNumber} from 'react-native-device-info';
import {URLConfig} from '../config/URLConfig';
import {getToken, printLog} from '../utility/AppUtility';

export const STATUS = {
  SUCCESS: 200,
  ERROR: 'error',
};

export const apiResponse = {
  status: STATUS,
  data: null,
  error: null,
};

let headers, userApiClient;

export const initApiClients = async () => {
  let token;
  try {
    token = await getToken();
  } catch (error) {}
  headers = {
    Authorization: token || '',
    'x-api-key': 'SpEbM4sCarPRwnFg', //'M+T*JxXLuCD?65u%_PMs%Q'
    'x-app-version': getBuildNumber(),
  };
  userApiClient = axios.create({
    baseURL: URLConfig.BASEURL,
    headers: headers,
  });
  axiosRetry(userApiClient, {
    retries: 0,
    retryDelay: retryCount => 300,
    retryCondition: () => true,
  });
};
initApiClients();

/**
 * Normalised method to avoid try catch block while calling API
 *
 * @param  {Promise} apiMethodToCall Pass API method created
 * @return {Object} Returns normalised response object
 *
 */
export const callAPIs = async apiMethodToCall => {
  try {
    const response = {...(await apiMethodToCall)};
    apiResponse.status_code = response.status;
    if (response.data.error != null) {
      apiResponse.status = STATUS.ERROR;
      apiResponse.error = response.data.error;
      return apiResponse;
    } else {
      apiResponse.status = STATUS.SUCCESS;
      apiResponse.data = response.data;
      return apiResponse;
    }
  } catch (error) {
    printLog(error);
    if (error.response) {
      apiResponse.data = error.response.data;
      apiResponse.status_code = error.response.status;
    }
    apiResponse.status = STATUS.ERROR;
    apiResponse.error = error.toString();
    return apiResponse;
  }
};

export const createUserAPI = async json => {
  if (!userApiClient) {
    await initApiClients();
  }
  return userApiClient.post('rolffit/centraluser/app/create/', json);
};
export const getSlotsApi = async () => {
  return userApiClient.get('rolffit/slots/app/sessions/');
};

export const bookSlotApi = async slotId => {
  return userApiClient.post(`rolffit/slots/app/sessions/${slotId}/book/`);
};

export const getMybookingApi = async () => {
  return userApiClient.get('rolffit/slots/app/employee/bookings/');
};
export const getFutureBookingApi = async () => {
  return userApiClient.get('rolffit/slots/app/employee/upcoming-bookings/');
};

export const rescheduleApi = async json => {
  return userApiClient.put(`rolffit/slots/app/employee/bookings/`, json);
};

export const sendFCMToken = json => {
  return userApiClient.post('rolffit/centraluser/app/device/detail/', json);
};

export const getTherapistSlotsApi = () => {
  return userApiClient.get('rolffit/slots/app/therapists/bookings/');
};

export const employeeCheckinApi = json => {
  return userApiClient.put('rolffit/slots/app/therapists/checkin/', json);
};
export const employeeCheckoutApi = json => {
  return userApiClient.put('rolffit/slots/app/therapists/checkout/', json);
};
export const employeeMarkUpdateApi = json => {
  return userApiClient.put(
    'rolffit/slots/app/therapists/employee-absent/',
    json,
  );
};
export const rateMassageApi = json => {
  return userApiClient.post('rolffit/ratingreview/v1/', json);
};

export const setUniqueCode = json =>
  userApiClient.post('rolffit/centraluser/app/unique-code/', json);

export const getMaintenanceApi = () =>
  userApiClient.get('rolffit/api/app/open/dialog/');
