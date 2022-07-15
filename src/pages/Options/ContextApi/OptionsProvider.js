import React, {createContext, useMemo, useReducer} from 'react';
import {optionsContextReducer} from './Options.reducer';
export const OptionsContext = createContext();
const initialState = {
  myBookings: {
    data: null,
    loading: true,
    error: null,
  },
};
const HomeProvider = ({children}) => {
  const [state, dispatch] = useReducer(optionsContextReducer, initialState);

  const value = useMemo(
    () => ({
      optionsStore: state,
      optionsDispatch: dispatch,
    }),
    [state],
  );

  return (
    <OptionsContext.Provider value={value}>{children}</OptionsContext.Provider>
  );
};

export default HomeProvider;
