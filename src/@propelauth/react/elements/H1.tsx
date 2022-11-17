import { useElements } from "../state";
import { Appearance, getPropsFromAppearance } from "../utils";
import { CSSProperties, ReactNode } from "react";

export type H1Props = {
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
};

export type H1PropsWithAppearance = { appearance?: Appearance } & H1Props;

export const H1 = ({ appearance, children }: H1PropsWithAppearance) => {
  const { elements } = useElements();
  const { styles, classes } = getPropsFromAppearance(appearance);

  return (
    <elements.H1 style={styles} className={classes}>
      {children}
    </elements.H1>
  );
};
