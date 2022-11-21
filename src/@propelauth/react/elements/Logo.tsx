import { useElements } from "../state";
import { Appearance, getClasses, getStyles } from "../utils";
import { CSSProperties } from "react";

export type LogoProps = {
  src: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
};

export type LogoPropsWithAppearance = { appearance?: Appearance } & LogoProps;

export const Logo = ({ className, style, appearance, src, alt }: LogoPropsWithAppearance) => {
  const { elements } = useElements();
  const classes = getClasses(className, appearance);
  const styles = getStyles(style, appearance);

  return <elements.Logo src={src} alt={alt} className={classes} style={styles} />;
};
