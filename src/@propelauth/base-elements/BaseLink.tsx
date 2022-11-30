import { BaseLinkProps } from "./_types";
import { prepend } from "./_utils";

export const BaseLink = ({ className, children, ...rest }: BaseLinkProps) => {
  return (
    <a className={prepend("BaseLink", className)} {...rest}>
      {children}
    </a>
  );
};
