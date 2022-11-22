import { useElements } from "../state";
import { Appearance, getClasses, getStyles } from "../utils";
import { CSSProperties } from "react";

export type ImageProps = {
  src: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
};

export type ImagePropsWithAppearance = { appearance?: Appearance } & ImageProps;

export const Image = ({ className, style, appearance, src, alt }: ImagePropsWithAppearance) => {
  const { elements } = useElements();
  const classes = getClasses(className, appearance);
  const styles = getStyles(style, appearance);

  return <elements.Image src={src} alt={alt} className={classes} style={styles} />;
};
