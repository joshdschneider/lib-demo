import { createContext, ReactNode } from "react";
import { ElementsProvider } from "./ElementsProvider";
import { Elements } from "./ElementsProvider";
import { Appearance, AppearanceProvider } from "./AppearanceProvider";
import { PropelAuthFeV2Client } from "@propel-auth-fern/fe_v2-client";

export type AuthState = {
  authUrl: string;
  client: PropelAuthFeV2Client;
};

export const AuthContext = createContext<AuthState | undefined>(undefined);

export type AuthProviderProps = {
  authUrl: string;
  elements?: Elements;
  appearance?: Appearance;
  children?: ReactNode;
};

export const AuthProvider = ({ authUrl, elements, appearance, children }: AuthProviderProps) => {
  const client = new PropelAuthFeV2Client({ environment: authUrl });
  return (
    <AuthContext.Provider value={{ authUrl, client }}>
      <ElementsProvider elements={elements}>
        <AppearanceProvider appearance={appearance}>{children}</AppearanceProvider>
      </ElementsProvider>
    </AuthContext.Provider>
  );
};
