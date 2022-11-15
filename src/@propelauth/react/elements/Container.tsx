import { useElements } from "../state";
import { Appearance, getPropsFromAppearance } from "../utils";
import { CSSProperties, ReactNode } from "react";

export type ContainerProps = {
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
};

export type ContainerPropsWithAppearance = { appearance?: Appearance } & ContainerProps;

export const Container = ({ appearance, children }: ContainerPropsWithAppearance) => {
  const { elements } = useElements();
  const { styles, classes } = getPropsFromAppearance(appearance);

  return (
    <elements.Container style={styles} className={classes}>
      {children}
    </elements.Container>
  );
};
