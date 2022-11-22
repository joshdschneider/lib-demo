import { useElements } from "../state";
import { Appearance, getClasses, getStyles } from "../utils";
import { ChangeEventHandler, CSSProperties } from "react";

export type CheckboxProps = {
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  id?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
};

export type CheckboxPropsWithAppearance = { appearance?: Appearance } & CheckboxProps;

export const Checkbox = ({
  appearance,
  id,
  label,
  checked,
  onChange,
  required,
  disabled,
  className,
  style,
}: CheckboxPropsWithAppearance) => {
  const { elements } = useElements();
  const classes = getClasses(className, appearance);
  const styles = getStyles(style, appearance);

  return (
    <elements.Checkbox
      id={id}
      label={label}
      required={required}
      disabled={disabled}
      checked={checked}
      onChange={onChange}
      className={classes}
      style={styles}
    />
  );
};
