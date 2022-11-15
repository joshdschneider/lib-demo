import { BaseButtonProps } from "./_types";

export const BaseButton = ({ loading, children, ...rest }: BaseButtonProps) => {
  return <button {...rest}>{loading ? "Loading..." : children}</button>;
};
