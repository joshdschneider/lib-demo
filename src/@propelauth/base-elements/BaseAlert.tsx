import { BaseAlertProps } from "./_types";

export const BaseAlert = ({ type, className, children, ...rest }: BaseAlertProps) => {
  return (
    <div className={className ? `alert-${type} ${className}` : `alert-${type}`} {...rest}>
      <span>{children}</span>
    </div>
  );
};
