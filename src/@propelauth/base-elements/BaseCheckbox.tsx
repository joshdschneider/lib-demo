import { BaseCheckboxProps } from "./_types";
import { BaseLabel } from "./BaseLabel";
import { prepend } from "./_utils";
import { forwardRef } from "react";

export const BaseCheckbox = forwardRef<HTMLInputElement, BaseCheckboxProps>((props, ref) => {
  const { id, label, className, ...rest } = props;
  return (
    <div className={prepend("BaseCheckbox", className)}>
      <input ref={ref} type={"checkbox"} id={id} {...rest} />
      <BaseLabel htmlFor={id}>{label}</BaseLabel>
    </div>
  );
});
