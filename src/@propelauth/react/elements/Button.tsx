import { useElements } from "../state";
import { ButtonProps, Appearance } from "./types";
import { getPropsFromAppearance } from "../utils";

export type ButtonPropsWithAppearance = { appearance?: Appearance } & ButtonProps;

export const Button = ({ appearance, onClick, children }: ButtonPropsWithAppearance) => {
  const { elements } = useElements();
  const { styles, classes } = getPropsFromAppearance(appearance);

  return (
    <elements.Button onClick={onClick} style={styles} className={classes}>
      {children}
    </elements.Button>
  );
};
