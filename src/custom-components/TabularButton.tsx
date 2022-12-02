import { ButtonProps } from "../@propelauth/react";

export const TabularButton = ({ className, loading, children, ...rest }: ButtonProps) => {
  return (
    <button className={"BaseButton border-radius-circular"} {...rest}>
      {children}
    </button>
  );
};
