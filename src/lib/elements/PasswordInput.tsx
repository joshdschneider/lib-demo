import { InputHTMLAttributes, Dispatch, SetStateAction } from "react";

export type NativeInputProps = InputHTMLAttributes<HTMLInputElement>;

export type PasswordInputProps = NativeInputProps & {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
};

export const PasswordInput = ({
  password,
  setPassword,
  ...rest
}: PasswordInputProps) => {
  return (
    <input
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      {...rest}
    />
  );
};
