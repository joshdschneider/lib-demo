import { createContext, ReactNode } from "react";
import { ContainerProps } from "../elements/Container";
import { EmailInputProps } from "../elements/EmailInput";
import { LinkProps } from "../elements/Link";
import { LogoProps } from "../elements/Logo";
import { PasswordInputProps } from "../elements/PasswordInput";
import { SubmitButtonProps } from "../elements/SubmitButton";
import { Appearance, useAppearance } from "./useAppearance";

export type Elements = {
  Container: (props: ContainerProps) => JSX.Element;
  Logo: (props: LogoProps) => JSX.Element;
  EmailInput: (props: EmailInputProps) => JSX.Element;
  PasswordInput: (props: PasswordInputProps) => JSX.Element;
  SubmitButton: (props: SubmitButtonProps) => JSX.Element;
  Link: (props: LinkProps) => JSX.Element;
};

export type AuthState = {
  authUrl: string;
  elements?: Elements;
  appearance?: Appearance;
};

export const AuthContext = createContext<AuthState | undefined>(undefined);

export type AuthProviderProps = {
  authUrl: string;
  elements?: Elements;
  children?: ReactNode;
};

export const AuthProvider = ({
  authUrl,
  elements,
  children,
}: AuthProviderProps) => {
  const { appearance } = useAppearance();

  return (
    <AuthContext.Provider value={{ authUrl, elements, appearance }}>
      {children}
    </AuthContext.Provider>
  );
};
