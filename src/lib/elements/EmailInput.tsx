import { InputHTMLAttributes, Dispatch, SetStateAction } from "react";

export type NativeInputProps = InputHTMLAttributes<HTMLInputElement>;

export type EmailInputProps = NativeInputProps & {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
};

export const EmailInput = ({ email, setEmail, ...rest }: EmailInputProps) => {
  return (
    <input value={email} onChange={(e) => setEmail(e.target.value)} {...rest} />
  );
};
