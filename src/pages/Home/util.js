import moment from 'moment';
import {printLog} from '../../utility/AppUtility';

export const DAY = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};
export const getDates = () => {
  const dates = [];
  let count = 5;
  let today = moment();
  while (count) {
    const day = today.weekday();
    if (day !== DAY.Sunday && day !== DAY.Saturday) {
      printLog(day, today.format('YYYY-MM-DD'));
      dates.push(today.format('YYYY-MM-DD'));
      count--;
    }
    today = today.add(1, 'days');
  }
  printLog(dates);
  return dates;
};
