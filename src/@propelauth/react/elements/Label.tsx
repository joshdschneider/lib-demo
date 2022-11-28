import { useElements } from "../state";
import { Appearance, getClasses, getStyles } from "../utils";
import { CSSProperties, ReactNode } from "react";

export type LabelProps = {
  htmlFor?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export type LabelPropsWithAppearance = { appearance?: Appearance } & LabelProps;

export const Label = ({ appearance, className, style, children }: LabelPropsWithAppearance) => {
  const { elements } = useElements();
  const classes = getClasses(className, appearance);
  const styles = getStyles(style, appearance);

  return (
    <elements.Label className={classes} style={styles}>
      {children}
    </elements.Label>
  );
};
