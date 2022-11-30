import { BaseInputProps } from "./_types";
import { prepend } from "./_utils";

export const BaseInput = ({ className, ...rest }: BaseInputProps) => {
  return <input className={prepend("BaseInput", className)} {...rest} />;
};
