import React, { useReducer, useEffect } from 'react';
import AppRouter from './router/AppRouter';
import AuthContext from './config/context/auth-context';
import { authManager } from './config/context/auth-manager';

const init = () => JSON.parse(localStorage.getItem('user')) || { signed: false };

function App() {
  const [user, dispatch] = useReducer(authManager, {}, init);
  
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user));
  }, [user]);


  return <AuthContext.Provider value={{ user, dispatch }}>
      <AppRouter />
      </AuthContext.Provider >;
    

}

export default App
