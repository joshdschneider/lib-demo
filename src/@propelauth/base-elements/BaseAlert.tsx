import { BaseAlertProps } from "./_types";
import { prepend } from "./_utils";
import { forwardRef } from "react";

export const BaseAlert = forwardRef<HTMLDivElement, BaseAlertProps>((props, ref) => {
  const { type, className, children, ...rest } = props;
  return (
    <div ref={ref} className={prepend(type ? `BaseAlert BaseAlert--${type}` : "BaseAlert", className)} {...rest}>
      <span>{children}</span>
    </div>
  );
});
