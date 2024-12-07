import React, { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  token: string | null;
  userId: string | null;
  roles: string[] | null;
  setToken: (token: string) => void;
  setUserId: (userId: string) => void;
  setRoles: (roles: string[]) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType>({
  token: null,
  userId: null,
  roles: null,
  setToken: () => {},
  setUserId: () => {},
  setRoles: () => {},
  logout: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [roles, setRoles] = useState<string[] | null>(null);

  const logout = () => {
    console.log(token);
    setToken(null);
    setUserId(null);
    setRoles(null);
  };

  return (
    <UserContext.Provider value={{ token, userId, roles, setToken, setUserId, setRoles, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
