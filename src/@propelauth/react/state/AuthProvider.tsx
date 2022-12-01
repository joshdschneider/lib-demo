import { createContext, ReactNode } from "react";
import { ElementsProvider } from "./ElementsProvider";
import { Elements } from "./ElementsProvider";
import { Appearance, AppearanceProvider } from "./AppearanceProvider";

export type AuthState = {
  authUrl: string;
};

export const AuthContext = createContext<AuthState | undefined>(undefined);

export type AuthProviderProps = {
  authUrl: string;
  elements?: Elements;
  appearance?: Appearance;
  children?: ReactNode;
};

export const AuthProvider = ({ authUrl, elements, appearance, children }: AuthProviderProps) => {
  return (
    <AuthContext.Provider value={{ authUrl }}>
      <ElementsProvider elements={elements}>
        <AppearanceProvider appearance={appearance}>{children}</AppearanceProvider>
      </ElementsProvider>
    </AuthContext.Provider>
  );
};
