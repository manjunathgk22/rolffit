import React, {createContext, useMemo, useReducer} from 'react';
import {homeContextReducer} from './Home.reducer';

export const HomeContext = createContext();
const initialState = {
  slotsData: {
    data: {},
    loading: true,
    error: null,
  },
  futureBookings: {
    data: null,
    loading: true,
    error: null,
  },
};
const HomeProvider = ({children}) => {
  const [state, dispatch] = useReducer(homeContextReducer, initialState);
  const value = useMemo(
    () => ({
      homeStore: state,
      homeDispatch: dispatch,
    }),
    [state],
  );

  return <HomeContext.Provider value={value}>{children}</HomeContext.Provider>;
};

export default HomeProvider;
