import { useElements } from "../state";
import { Appearance, getPropsFromAppearance } from "../utils";
import { ChangeEventHandler, CSSProperties } from "react";

export type InputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  type?: string;
  required?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  style?: CSSProperties;
  className?: string;
};

export type InputPropsWithAppearance = { appearance?: Appearance } & InputProps;

export const Input = ({ appearance, type, value, onChange }: InputPropsWithAppearance) => {
  const { elements } = useElements();
  const { styles, classes } = getPropsFromAppearance(appearance);

  return <elements.Input type={type} value={value} onChange={onChange} style={styles} className={classes} />;
};
