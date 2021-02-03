import React, { createContext, useEffect, useState } from 'react';
import ProductAPI from './api/ProductAPI';

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  const refreshToken = async () => {
    const refresh = await fetch('http://localhost:3001/user/refresh_token', {
      method: 'GET',
    });

    const data = await refresh.json();
    setToken(data.accessToken);
  };

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (firstLogin) refreshToken();
  }, []);

  const state = {
    token: [token, setToken],
    ProductAPI: ProductAPI(),
  };

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};
