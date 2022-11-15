import { useElements } from "../state";
import { Appearance, getPropsFromAppearance } from "../utils";
import { CSSProperties } from "react";

export type LogoProps = {
  src: string;
  alt?: string;
  style?: CSSProperties;
  className?: string;
};

export type LogoPropsWithAppearance = { appearance?: Appearance } & LogoProps;

export const Logo = ({ appearance, src, alt }: LogoPropsWithAppearance) => {
  const { elements } = useElements();
  const { styles, classes } = getPropsFromAppearance(appearance);

  return <elements.Logo src={src} alt={alt} style={styles} className={classes} />;
};
