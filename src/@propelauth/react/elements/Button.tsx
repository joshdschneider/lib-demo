import { CSSProperties, MouseEventHandler, ReactNode } from "react";
import { useElements } from "../state";
import { Appearance, getPropsFromAppearance } from "../utils";

export type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
};

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
