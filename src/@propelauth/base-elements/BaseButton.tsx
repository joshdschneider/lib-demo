import { BaseButtonProps } from "./_types";
import { BaseProgress } from "./BaseProgress";
import { prepend } from "./_utils";

export const BaseButton = ({ loading, className, children, ...rest }: BaseButtonProps) => {
  return (
    <button className={prepend("BaseButton", className)} {...rest}>
      {loading ? <BaseProgress /> : children}
    </button>
  );
};
