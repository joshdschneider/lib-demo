import { InputHTMLAttributes, Dispatch, SetStateAction } from "react";

export type NativeInputProps = InputHTMLAttributes<HTMLInputElement>;

export type BaseEmailInputProps = NativeInputProps & {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
};

export const BaseEmailInput = ({
  email,
  setEmail,
  ...rest
}: BaseEmailInputProps) => {
  return (
    <input value={email} onChange={(e) => setEmail(e.target.value)} {...rest} />
  );
};
