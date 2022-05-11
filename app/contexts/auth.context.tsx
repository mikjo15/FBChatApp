import React, {createContext, useReducer, FC} from 'react';
import {authReducer} from '../reducers/auth.reducer';
import {AuthStateType, AuthAction} from '../interfaces';

const initialState: AuthStateType = {
  auth: false,
};

export const AuthContext = createContext<AuthStateType>(initialState);

// Make authentication dispatch and catch it in the reducer, so the reducer have an action

export const AuthProvider: FC = ({children}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const authenticate = () => {
    dispatch();
  };

  return (
    <AuthContext.Provider
      value={{
        auth: state.auth,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
