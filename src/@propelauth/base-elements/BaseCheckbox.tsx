import { BaseCheckboxProps } from "./_types";
import { BaseLabel } from "./BaseLabel";
import { prepend } from "./_utils";

export const BaseCheckbox = ({ id, label, className, ...rest }: BaseCheckboxProps) => {
  return (
    <div className={prepend("BaseCheckbox", className)}>
      <input type={"checkbox"} id={id} {...rest} />
      <BaseLabel htmlFor={id}>{label}</BaseLabel>
    </div>
  );
};
