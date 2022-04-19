/**
 * React stuff
 */
import { createContext, useContext, useReducer } from 'react';

/**
 * Reducers
 */
import { reducer, initialState } from '../reducers/nav.reducer';

const NavigationContext = createContext();
export const useNavigation = () => {
  return useContext(NavigationContext);
};

/**
 *
 * Custom NavigationContext.Provider component
 */
export const NavigationProvider = ({ children }) => {
  const [navState, dispatch] = useReducer(reducer, initialState);
  return (
    <NavigationContext.Provider value={{ navState, dispatch }}>
      {children}
    </NavigationContext.Provider>
  );
};
