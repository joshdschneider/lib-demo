import { BaseDividerProps } from "./_types";
import { prepend } from "./_utils";

export const BaseDivider = ({ className, children, ...rest }: BaseDividerProps) => {
  return (
    <div className={prepend("BaseDivider", className)} {...rest}>
      {children && <span>{children}</span>}
    </div>
  );
};
