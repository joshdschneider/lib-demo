import { BaseAlertProps } from "./_types";

export const BaseAlert = ({ type, children, ...rest }: BaseAlertProps) => {
  return (
    <div className={"alert-" + type} {...rest}>
      <span>{children}</span>
    </div>
  );
};
