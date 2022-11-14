import { useElements } from "../state";
import { LogoProps, Appearance } from "./types";
import { getPropsFromAppearance } from "../utils";

export type LogoPropsWithAppearance = { appearance?: Appearance } & LogoProps;

export const Logo = ({ appearance, src, alt }: LogoPropsWithAppearance) => {
  const { elements } = useElements();
  const { styles, classes } = getPropsFromAppearance(appearance);

  return <elements.Logo src={src} alt={alt} style={styles} className={classes} />;
};
