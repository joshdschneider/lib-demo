import { BaseContainerProps } from "./_types";

export const BaseContainer = ({ children, ...rest }: BaseContainerProps) => {
  return <div {...rest}>{children}</div>;
};
