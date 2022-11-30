import { BaseCheckboxProps } from "./_types";
import { BaseLabel } from "./BaseLabel";

export const BaseCheckbox = ({ id, label, className, ...rest }: BaseCheckboxProps) => {
  return (
    <div className={className}>
      <input type={"checkbox"} id={id} {...rest} />
      <BaseLabel htmlFor={id}>{label}</BaseLabel>
    </div>
  );
};
