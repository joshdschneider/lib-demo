import { BaseLabelProps } from "./_types";

export const BaseLabel = ({ children, ...rest }: BaseLabelProps) => {
  return <label {...rest}>{children}</label>;
};
