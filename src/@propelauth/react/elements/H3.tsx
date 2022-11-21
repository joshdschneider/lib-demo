import { useElements } from "../state";
import { Appearance, getClasses, getStyles } from "../utils";
import { CSSProperties, ReactNode } from "react";

export type H3Props = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export type H3PropsWithAppearance = { appearance?: Appearance } & H3Props;

export const H3 = ({ appearance, className, style, children }: H3PropsWithAppearance) => {
  const { elements } = useElements();
  const classes = getClasses(className, appearance);
  const styles = getStyles(style, appearance);

  return (
    <elements.H3 className={classes} style={styles}>
      {children}
    </elements.H3>
  );
};
