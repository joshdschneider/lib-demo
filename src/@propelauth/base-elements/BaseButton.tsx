import { BaseButtonProps } from "./_types";
import { BaseProgress } from "./BaseProgress";
import { prepend } from "./_utils";
import { forwardRef } from "react";

export const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>((props, ref) => {
  const { loading, className, children, ...rest } = props;
  return (
    <button ref={ref} className={prepend("BaseButton", className)} {...rest}>
      {loading ? <BaseProgress /> : children}
    </button>
  );
});
