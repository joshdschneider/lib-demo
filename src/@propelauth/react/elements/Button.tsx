import { CSSProperties, MouseEventHandler, ReactNode } from "react";
import { useElements } from "../state";
import { Appearance, getClasses, getStyles } from "../utils";

export type ButtonProps = {
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export type ButtonPropsWithAppearance = { appearance?: Appearance } & ButtonProps;

export const Button = ({ appearance, loading, onClick, className, style, children }: ButtonPropsWithAppearance) => {
  const { elements } = useElements();
  const classes = getClasses(className, appearance);
  const styles = getStyles(style, appearance);

  return (
    <elements.Button loading={loading} onClick={onClick} className={classes} style={styles}>
      {children}
    </elements.Button>
  );
};
