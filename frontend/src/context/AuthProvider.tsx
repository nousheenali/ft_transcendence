"use client";
import React, { ReactNode, createContext, useState } from "react";

type AuthContextType = {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>; // Adjust the type accordingly
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

type AuthProviderProps = {
  children: ReactNode; // Define a type for 'children'
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState({});
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
