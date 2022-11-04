import { ButtonHTMLAttributes } from "react";

export type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export type BaseSubmitButtonProps = NativeButtonProps & {
  handleSubmit: () => void;
};

export const BaseSubmitButton = ({
  handleSubmit,
  ...rest
}: BaseSubmitButtonProps) => {
  return (
    <button onClick={handleSubmit} {...rest}>
      Submit
    </button>
  );
};
