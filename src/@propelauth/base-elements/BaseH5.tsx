import { BaseH5Props } from "./_types";
import { prepend } from "./_utils";
import { forwardRef } from "react";

export const BaseH5 = forwardRef<HTMLHeadingElement, BaseH5Props>((props, ref) => {
  const { className, children, ...rest } = props;
  return (
    <h5 ref={ref} className={prepend("BaseH5", className)} {...rest}>
      {children}
    </h5>
  );
});
