import { useElements } from "../state";
import { Appearance, getClasses, getStyles } from "../utils";
import { ChangeEventHandler, CSSProperties } from "react";

export type InputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type?: string;
  required?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  className?: string;
  style?: CSSProperties;
};

export type InputPropsWithAppearance = { appearance?: Appearance } & InputProps;

export const Input = ({
  appearance,
  type,
  placeholder,
  value,
  onChange,
  className,
  style,
}: InputPropsWithAppearance) => {
  const { elements } = useElements();
  const classes = getClasses(className, appearance);
  const styles = getStyles(style, appearance);

  return (
    <elements.Input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={classes}
      style={styles}
    />
  );
};
