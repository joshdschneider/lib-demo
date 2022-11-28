import { BaseDividerProps } from "./_types";

export const BaseDivider = ({ children, ...rest }: BaseDividerProps) => {
  return <hr {...rest} />;
};
