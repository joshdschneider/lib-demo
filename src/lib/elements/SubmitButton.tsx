import { ButtonHTMLAttributes } from "react";

export type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export type SubmitButtonProps = NativeButtonProps & {
  handleSubmit: () => void;
};

export const SubmitButton = ({ handleSubmit, ...rest }: SubmitButtonProps) => {
  return (
    <button onClick={handleSubmit} {...rest}>
      Submit
    </button>
  );
};
