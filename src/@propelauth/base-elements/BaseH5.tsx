import { BaseH5Props } from "./_types";

export const BaseH5 = ({ children, ...rest }: BaseH5Props) => {
  return <h3 {...rest}>{children}</h3>;
};
