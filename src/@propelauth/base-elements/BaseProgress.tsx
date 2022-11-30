import { BaseProgressProps } from "./_types";
import { prepend } from "./_utils";

export const BaseProgress = ({ className, ...rest }: BaseProgressProps) => {
  return (
    <span className={prepend("BaseProgress", className)} {...rest}>
      Loading...
    </span>
  );
};
