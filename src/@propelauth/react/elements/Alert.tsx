import { useElements } from "../state";
import { Appearance, getClasses, getStyles } from "../utils";
import { CSSProperties, ReactNode } from "react";

export type AlertProps = {
  type?: "error" | "info" | "success" | "warning";
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export type AlertPropsWithAppearance = { appearance?: Appearance } & AlertProps;

export const Alert = ({ appearance, type, className, style, children }: AlertPropsWithAppearance) => {
  const { elements } = useElements();
  const classes = getClasses(className, appearance);
  const styles = getStyles(style, appearance);

  return (
    <elements.Alert type={type} className={classes} style={styles}>
      {children}
    </elements.Alert>
  );
};
