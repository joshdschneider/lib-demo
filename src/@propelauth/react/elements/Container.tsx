import { useElements } from "../state";
import { Appearance, getClasses, getStyles } from "../utils";
import { CSSProperties, ReactNode } from "react";

export type ContainerProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export type ContainerPropsWithAppearance = { appearance?: Appearance } & ContainerProps;

export const Container = ({ appearance, className, style, children }: ContainerPropsWithAppearance) => {
  const { elements } = useElements();
  const classes = getClasses(className, appearance);
  const styles = getStyles(style, appearance);

  return (
    <elements.Container className={classes} style={styles}>
      {children}
    </elements.Container>
  );
};
