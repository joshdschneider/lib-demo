import { BaseParagraphProps } from "./_types";

export const BaseParagraph = ({ children, ...rest }: BaseParagraphProps) => {
  return <p {...rest}>{children}</p>;
};
