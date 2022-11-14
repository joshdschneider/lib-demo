import { useElements } from "../state";
import { InputProps, Appearance } from "./types";
import { getPropsFromAppearance } from "../utils";

export type InputPropsWithAppearance = { appearance?: Appearance } & InputProps;

export const Input = ({ appearance, type, value, onChange }: InputPropsWithAppearance) => {
  const { elements } = useElements();
  const { styles, classes } = getPropsFromAppearance(appearance);

  return <elements.Input type={type} value={value} onChange={onChange} style={styles} className={classes} />;
};
