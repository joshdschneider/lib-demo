import { BaseLinkProps } from "./_types";
import { prepend } from "./_utils";
import { forwardRef } from "react";

export const BaseLink = forwardRef<HTMLAnchorElement, BaseLinkProps>((props, ref) => {
  const { className, children, ...rest } = props;
  return (
    <a ref={ref} className={prepend("BaseLink", className)} {...rest}>
      {children}
    </a>
  );
});
