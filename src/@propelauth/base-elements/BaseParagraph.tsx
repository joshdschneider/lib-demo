import { BaseParagraphProps } from "./_types";
import { prepend } from "./_utils";

export const BaseParagraph = ({ className, children, ...rest }: BaseParagraphProps) => {
  return (
    <p className={prepend("BaseParagraph", className)} {...rest}>
      {children}
    </p>
  );
};
