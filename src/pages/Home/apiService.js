import {callAPIs, createUserAPI, STATUS} from '../../api/apiRequest';

export const getSlots = async json => {
  const response = await callAPIs(createUserAPI(json));
  if (response.status === STATUS.SUCCESS) {
    return response.data;
  } else {
    return null;
  }
};
