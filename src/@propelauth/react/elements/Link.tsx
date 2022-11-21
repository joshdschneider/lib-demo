import { useElements } from "../state";
import { Appearance, getClasses, getStyles } from "../utils";
import { CSSProperties, ReactNode } from "react";

export type LinkProps = {
  href: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export type LinkPropsWithAppearance = { appearance?: Appearance } & LinkProps;

export const Link = ({ appearance, className, style, href, children }: LinkPropsWithAppearance) => {
  const { elements } = useElements();
  const classes = getClasses(className, appearance);
  const styles = getStyles(style, appearance);

  return (
    <elements.Link href={href} className={classes} style={styles}>
      {children}
    </elements.Link>
  );
};
