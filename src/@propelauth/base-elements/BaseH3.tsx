import { BaseH3Props } from "./_types";
import { prepend } from "./_utils";
import { forwardRef } from "react";

export const BaseH3 = forwardRef<HTMLHeadingElement, BaseH3Props>((props, ref) => {
  const { className, children, ...rest } = props;
  return (
    <h3 ref={ref} className={prepend("BaseH3", className)} {...rest}>
      {children}
    </h3>
  );
});
