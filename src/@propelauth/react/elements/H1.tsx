import { useElements } from "../state";
import { Appearance, getClasses, getStyles } from "../utils";
import { CSSProperties, ReactNode } from "react";

export type H1Props = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export type H1PropsWithAppearance = { appearance?: Appearance } & H1Props;

export const H1 = ({ appearance, className, style, children }: H1PropsWithAppearance) => {
  const { elements } = useElements();
  const classes = getClasses(className, appearance);
  const styles = getStyles(style, appearance);

  return (
    <elements.H1 className={classes} style={styles}>
      {children}
    </elements.H1>
  );
};
