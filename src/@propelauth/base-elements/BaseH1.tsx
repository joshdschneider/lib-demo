import { BaseH1Props } from "./_types";
import { prepend } from "./_utils";

export const BaseH1 = ({ className, children, ...rest }: BaseH1Props) => {
  return (
    <h1 className={prepend("BaseH1", className)} {...rest}>
      {children}
    </h1>
  );
};
