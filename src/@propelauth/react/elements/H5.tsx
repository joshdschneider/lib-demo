import { useElements } from "../state";
import { Appearance, getPropsFromAppearance } from "../utils";
import { CSSProperties, ReactNode } from "react";

export type H5Props = {
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
};

export type H5PropsWithAppearance = { appearance?: Appearance } & H5Props;

export const H5 = ({ appearance, children }: H5PropsWithAppearance) => {
  const { elements } = useElements();
  const { styles, classes } = getPropsFromAppearance(appearance);

  return (
    <elements.H5 style={styles} className={classes}>
      {children}
    </elements.H5>
  );
};
