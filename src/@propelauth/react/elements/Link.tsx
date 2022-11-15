import { useElements } from "../state";
import { Appearance, getPropsFromAppearance } from "../utils";
import { CSSProperties, ReactNode } from "react";

export type LinkProps = {
  href: string;
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
};

export type LinkPropsWithAppearance = { appearance?: Appearance } & LinkProps;

export const Link = ({ appearance, href, children }: LinkPropsWithAppearance) => {
  const { elements } = useElements();
  const { styles, classes } = getPropsFromAppearance(appearance);

  return (
    <elements.Link href={href} style={styles} className={classes}>
      {children}
    </elements.Link>
  );
};
