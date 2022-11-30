import { BaseH5Props } from "./_types";
import { prepend } from "./_utils";

export const BaseH5 = ({ className, children, ...rest }: BaseH5Props) => {
  return (
    <h3 className={prepend("BaseH5", className)} {...rest}>
      {children}
    </h3>
  );
};
