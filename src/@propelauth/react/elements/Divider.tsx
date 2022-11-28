import { useElements } from "../state";
import { Appearance, getClasses, getStyles } from "../utils";
import { CSSProperties, ReactNode } from "react";

export type DividerProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export type DividerPropsWithAppearance = { appearance?: Appearance } & DividerProps;

export const Divider = ({ appearance, className, style, children }: DividerPropsWithAppearance) => {
  const { elements } = useElements();
  const classes = getClasses(className, appearance);
  const styles = getStyles(style, appearance);

  return (
    <elements.Divider className={classes} style={styles}>
      {children}
    </elements.Divider>
  );
};
