import { BaseH1Props } from "./_types";

export const BaseH1 = ({ children, ...rest }: BaseH1Props) => {
  return <h1 {...rest}>{children}</h1>;
};
