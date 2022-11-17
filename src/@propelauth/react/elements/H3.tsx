import { useElements } from "../state";
import { Appearance, getPropsFromAppearance } from "../utils";
import { CSSProperties, ReactNode } from "react";

export type H3Props = {
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
};

export type H3PropsWithAppearance = { appearance?: Appearance } & H3Props;

export const H3 = ({ appearance, children }: H3PropsWithAppearance) => {
  const { elements } = useElements();
  const { styles, classes } = getPropsFromAppearance(appearance);

  return (
    <elements.H3 style={styles} className={classes}>
      {children}
    </elements.H3>
  );
};
