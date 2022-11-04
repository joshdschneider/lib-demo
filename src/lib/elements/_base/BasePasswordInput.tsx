import { InputHTMLAttributes, Dispatch, SetStateAction } from "react";

export type NativeInputProps = InputHTMLAttributes<HTMLInputElement>;

export type BasePasswordInputProps = NativeInputProps & {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
};

export const BasePasswordInput = ({
  password,
  setPassword,
  ...rest
}: BasePasswordInputProps) => {
  return (
    <input
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      {...rest}
    />
  );
};
