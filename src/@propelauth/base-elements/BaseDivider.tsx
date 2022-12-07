import { BaseDividerProps } from "./_types";
import { prepend } from "./_utils";
import { forwardRef } from "react";

export const BaseDivider = forwardRef<HTMLDivElement, BaseDividerProps>((props, ref) => {
  const { className, children, ...rest } = props;
  return (
    <div ref={ref} className={prepend("BaseDivider", className)} data-children={!!children} {...rest}>
      <span>{children}</span>
    </div>
  );
});
