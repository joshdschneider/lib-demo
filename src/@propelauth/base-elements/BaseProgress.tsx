import { BaseProgressProps } from "./_types";
import { prepend } from "./_utils";
import { forwardRef } from "react";

export const BaseProgress = forwardRef<HTMLSpanElement, BaseProgressProps>((props, ref) => {
  const { className, ...rest } = props;
  return (
    <span ref={ref} className={prepend("BaseProgress", className)} {...rest}>
      Loading...
    </span>
  );
});
