import {callAPIs, getMybookingApi, STATUS} from '../../api/apiRequest';

export const getMybookingApiHelper = async () => {
  const response = await callAPIs(getMybookingApi());
  if (response.status_code === STATUS.SUCCESS) {
    return response.data;
  } else {
    return false;
  }
};
