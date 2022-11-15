import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ElementsProvider } from "./ElementsProvider";
import { Elements } from "./ElementsProvider";

export type AuthState = {
  authUrl: string;
};

export const AuthContext = createContext<AuthState | undefined>(undefined);

export type AuthProviderProps = {
  authUrl: string;
  elements?: Elements;
  children?: ReactNode;
};

export const AuthProvider = ({ authUrl, elements, children }: AuthProviderProps) => {
  return (
    <AuthContext.Provider value={{ authUrl }}>
      <ElementsProvider elements={elements}>{children}</ElementsProvider>
    </AuthContext.Provider>
  );
};
