import { BaseAlertProps } from "./_types";
import { prepend } from "./_utils";

export const BaseAlert = ({ type, className, children, ...rest }: BaseAlertProps) => {
  return (
    <div className={prepend(type ? `BaseAlert BaseAlert--${type}` : "BaseAlert", className)} {...rest}>
      <span>{children}</span>
    </div>
  );
};
