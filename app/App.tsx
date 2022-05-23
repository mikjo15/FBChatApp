import React from 'react';
import {AuthProvider} from './contexts/auth.context';
import {RootNavigator} from './navigators/root.navigator';

const App = () => {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
};

export default App;
