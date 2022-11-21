import { useElements } from "../state";
import { Appearance, getClasses, getStyles } from "../utils";
import { CSSProperties, ReactNode } from "react";

export type H5Props = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export type H5PropsWithAppearance = { appearance?: Appearance } & H5Props;

export const H5 = ({ appearance, className, style, children }: H5PropsWithAppearance) => {
  const { elements } = useElements();
  const classes = getClasses(className, appearance);
  const styles = getStyles(style, appearance);

  return (
    <elements.H5 style={styles} className={classes}>
      {children}
    </elements.H5>
  );
};
