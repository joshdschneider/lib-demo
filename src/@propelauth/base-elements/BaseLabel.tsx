import { BaseLabelProps } from "./_types";
import { prepend } from "./_utils";
import { forwardRef } from "react";

export const BaseLabel = forwardRef<HTMLLabelElement, BaseLabelProps>((props, ref) => {
  const { className, children, ...rest } = props;
  return (
    <label ref={ref} className={prepend("BaseLabel", className)} {...rest}>
      {children}
    </label>
  );
});
