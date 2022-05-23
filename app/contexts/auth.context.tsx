import React, {createContext, FC, useContext, useState} from 'react';

interface AuthContextInterface {
  state: {
    idToken: string;
    serverAuthCode: string;
    scopes: Array<string>; // on iOS this is empty array if no additional scopes are defined
    user: {
      email: string;
      id: string;
      givenName: string;
      familyName: string;
      photo: string; // url
      name: string; // full name
    };
  };
  setState: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

export const AuthProvider: FC = ({children}) => {
  const [state, setState] = useState({
    auth: false,
  });

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
