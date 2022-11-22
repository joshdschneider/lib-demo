import { BaseCheckboxProps } from "./_types";

export const BaseCheckbox = ({ id, label, ...rest }: BaseCheckboxProps) => {
  return (
    <>
      <input type={"checkbox"} id={id} {...rest} />
      <label htmlFor={id}>{label}</label>
    </>
  );
};
