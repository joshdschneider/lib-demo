import { BaseLabelProps } from "./_types";
import { prepend } from "./_utils";

export const BaseLabel = ({ className, children, ...rest }: BaseLabelProps) => {
  return (
    <label className={prepend("BaseLabel", className)} {...rest}>
      {children}
    </label>
  );
};
