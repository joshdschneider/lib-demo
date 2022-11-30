import { BaseH3Props } from "./_types";
import { prepend } from "./_utils";

export const BaseH3 = ({ className, children, ...rest }: BaseH3Props) => {
  return (
    <h3 className={prepend("BaseH3", className)} {...rest}>
      {children}
    </h3>
  );
};
