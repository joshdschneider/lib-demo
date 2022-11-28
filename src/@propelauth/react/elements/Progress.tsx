import { useElements } from "../state";
import { Appearance, getClasses, getStyles } from "../utils";
import { CSSProperties } from "react";

export type ProgressProps = {
  className?: string;
  style?: CSSProperties;
};

export type ProgressPropsWithAppearance = { appearance?: Appearance } & ProgressProps;

export const Progress = ({ appearance, className, style }: ProgressPropsWithAppearance) => {
  const { elements } = useElements();
  const classes = getClasses(className, appearance);
  const styles = getStyles(style, appearance);

  return <elements.Progress className={classes} style={styles} />;
};
