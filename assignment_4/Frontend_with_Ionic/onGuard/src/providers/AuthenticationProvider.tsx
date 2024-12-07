import React, { PropsWithChildren, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export const AuthenticationContext = React.createContext({
  isAuthenticated: false,
  logout: () => {},
});

export const AuthenticationProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('authToken');
    setIsAuthenticated(!!token);
  }, []);

  const logout = () => {
    Cookies.remove('authToken');
    Cookies.remove('userRoles');
    Cookies.remove('userId');
    setIsAuthenticated(false);
  };

  return (
    <AuthenticationContext.Provider value={{ isAuthenticated, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};
