import React, {createContext, useMemo, useReducer} from 'react';
import {globalContextReducer} from './GlobalContext.reducer';

export const GlobalContext = createContext();
const initialState = {
  testData: 'qqq',
  loginData: null,
};
const GlobalProvider = ({children}) => {
  const [state, dispatch] = useReducer(globalContextReducer, initialState);
  const value = useMemo(
    () => ({
      globalStore: state,
      globalDispatch: dispatch,
    }),
    [state],
  );

  return (
    <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
  );
};

export default GlobalProvider;
