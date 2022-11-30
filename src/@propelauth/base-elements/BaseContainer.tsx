import { BaseContainerProps } from "./_types";
import { prepend } from "./_utils";

export const BaseContainer = ({ className, children, ...rest }: BaseContainerProps) => {
  return (
    <div className={prepend("BaseContainer", className)} {...rest}>
      {children}
    </div>
  );
};
