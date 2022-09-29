import {
  bookSlotApi,
  callAPIs,
  employeeCheckinApi,
  employeeCheckoutApi,
  employeeMarkUpdateApi,
  getFutureBookingApi,
  getMainCardApi,
  getSlotsApi,
  getTherapistSlotsApi,
  rateMassageApi,
  rescheduleApi,
  STATUS,
} from '../../api/apiRequest';
import {tConvert} from '../../utility/AppUtility';

export const getSlotsApiHelper = async () => {
  const response = await callAPIs(getSlotsApi());
  if (response.status === STATUS.SUCCESS) {
    let todayBooked = null;
    response.data.slots_data?.[0]?.slot_sessions?.some(slot => {
      if (slot.has_user_booked) {
        todayBooked = slot;
        return true;
      }
      return false;
    });
    let tomorrowBooked = null;
    response.data.slots_data?.[1]?.slot_sessions?.some(slot => {
      if (slot.has_user_booked) {
        tomorrowBooked = slot;
        return true;
      }
      return false;
    });
    if (response.data.slots_data) {
      response.data.slots_data = response.data.slots_data?.map(day => {
        const free = [];
        const paid = [];
        day.slot_sessions?.map(slot => {
          if (slot.payment_details) {
            paid.push(slot);
          } else {
            free.push(slot);
          }
        });

        return {
          ...day,
          free,
          paid,
        };
      });
    }
    const normalisedResponse = {
      ...response,
      data: {
        TODAY: {
          ...response.data.slots_data?.[0],
          booked: todayBooked,
        },
        TOMORROW: {
          ...response.data.slots_data?.[1],
          booked: tomorrowBooked,
        },
        allData: response.data,
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
export const bookSlotApiHelper = async (slotId, json) => {
  const response = await callAPIs(bookSlotApi(slotId, json));
  if (response.data) {
    return response.data;
  } else {
    return response.error;
  }
};

export const futureBookingApiHelper = async () => {
  const response = await callAPIs(getFutureBookingApi());
  if (response.data) {
    return response.data?.slot_bookings;
  } else {
    return false;
  }
};

export const mainCardApiHelper = async () => {
  const response = await callAPIs(getMainCardApi());
  if (response.data) {
    return response.data;
  } else {
    return false;
  }
};

export const rescheduleApiHelper = async json => {
  const response = await callAPIs(rescheduleApi(json));
  if (response.data) {
    return response.data;
  } else {
    return response.error;
  }
};

export const getTherapistSlotsApiHelper = async () => {
  const response = await callAPIs(getTherapistSlotsApi());
  if (response.data) {
    return response.data?.slot_bookings;
  } else {
    return false;
  }
};

export const employeeCheckinApiHelper = async json => {
  const response = await callAPIs(employeeCheckinApi(json));
  if (response.data) {
    return response.data;
  } else {
    return false;
  }
};

export const employeeCheckoutApiHelper = async json => {
  const response = await callAPIs(employeeCheckoutApi(json));
  if (response.data) {
    return response.data;
  } else {
    return false;
  }
};

export const rateMassageApiHelper = async json => {
  const response = await callAPIs(rateMassageApi(json));
  if (response.data) {
    return response.data;
  } else {
    return false;
  }
};

export const employeeAbsentApiHelper = async json => {
  const response = await callAPIs(employeeMarkUpdateApi(json));
  return response;
};
