import { BaseCheckboxProps } from "./_types";
import { BaseLabel } from "./BaseLabel";

export const BaseCheckbox = ({ id, label, ...rest }: BaseCheckboxProps) => {
  return (
    <>
      <input type={"checkbox"} id={id} {...rest} />
      <BaseLabel htmlFor={id}>{label}</BaseLabel>
    </>
  );
};
