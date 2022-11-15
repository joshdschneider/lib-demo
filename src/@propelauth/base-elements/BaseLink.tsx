import { BaseLinkProps } from "./_types";

export const BaseLink = ({ children, ...rest }: BaseLinkProps) => {
  return <a {...rest}>{children}</a>;
};
