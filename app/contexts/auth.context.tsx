import React, {createContext, FC, useContext, useState} from 'react';

export const AuthContext = createContext({});

export const AuthProvider: FC = ({children}) => {
  const [state, setState] = useState({});

  return (
    <AuthContext.Provider value={{state, setState}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const {state, setState} = useContext(AuthContext);

  if (state === undefined) {
    throw new Error('useAuth needs to be used with the AuthContext');
  }

  return {state, setState};
};
