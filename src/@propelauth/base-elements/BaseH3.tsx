import { BaseH3Props } from "./_types";

export const BaseH3 = ({ children, ...rest }: BaseH3Props) => {
  return <h3 {...rest}>{children}</h3>;
};
