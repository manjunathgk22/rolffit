import {bookSlotApi, callAPIs, getSlotsApi, STATUS} from '../../api/apiRequest';
import {tConvert} from '../../utility/AppUtility';

export const getSlotsApiHelper = async () => {
  const response = await callAPIs(getSlotsApi());
  if (response.status === STATUS.SUCCESS) {
    const normalisedResponse = {
      ...response,
      data: {
        TODAY: response.data.slots_data?.[0],
        TOMORROW: response.data.slots_data?.[1],
      },
    };

    // normalisedResponse.data.TODAY.slot_sessions.push({
    //   ...normalisedResponse.data.TODAY.slot_sessions[0],
    //   id: 12,
    //   has_booked: true,
    //   slot: {
    //     ...normalisedResponse.data.TODAY.slot_sessions[0].slot,
    //     start_time: '17:00:00',
    //   },
    // });
    return normalisedResponse.data;
  } else {
    return null;
  }
};
export const bookSlotApiHelper = async slotId => {
  const response = await callAPIs(bookSlotApi(slotId));
  if (response.status_code === STATUS.SUCCESS) {
    return response.data;
  } else {
    return false;
  }
};
