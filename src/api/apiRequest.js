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
  const token = await getToken();
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

export async function createUserAPI(json) {
  if (!userApiClient) {
    await initApiClients();
  }
  return userApiClient.post('rolffit/centraluser/app/create/', json);
}
export const getSlotsApi = async () => {
  return userApiClient.get('rolffit/slots/app/sessions/');
};

export const bookSlotApi = async slotId => {
  return userApiClient.post(`rolffit/slots/app/sessions/${slotId}/book/`);
};

export const getMybookingApi = async () => {
  return userApiClient.get('rolffit/slots/app/employee/bookings/');
};
