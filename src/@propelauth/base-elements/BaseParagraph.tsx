import { BaseParagraphProps } from "./_types";
import { prepend } from "./_utils";
import { forwardRef } from "react";

export const BaseParagraph = forwardRef<HTMLParagraphElement, BaseParagraphProps>((props, ref) => {
  const { className, children, ...rest } = props;
  return (
    <p ref={ref} className={prepend("BaseParagraph", className)} {...rest}>
      {children}
    </p>
  );
});
