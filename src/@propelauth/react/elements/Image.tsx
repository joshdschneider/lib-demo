import { ElementAppearance, useAppearance, useElements } from "../state";
import { getPropsFromAppearance, joinClasses, joinStyles } from "../utils";
import { CSSProperties } from "react";

export type ImageProps = {
  src: string;
  alt?: string;
  className?: string;
  style?: CSSProperties;
};

export type ImagePropsWithAppearance = { appearance?: ElementAppearance<ImageProps> } & ImageProps;

export const Image = ({ src, alt, appearance }: ImagePropsWithAppearance) => {
  const { elements } = useElements();
  const globalAppearance = useAppearance().appearance.elements?.Image;
  const globalProps = getPropsFromAppearance(globalAppearance);
  const localProps = getPropsFromAppearance(appearance);
  const joinedProps = {
    classes: joinClasses(globalProps.classes, localProps.classes),
    styles: joinStyles(globalProps.styles, localProps.styles),
    Element: localProps.Element || globalProps.Element,
  };

  if (joinedProps.Element) {
    return <joinedProps.Element src={src} alt={alt} className={joinedProps.classes} style={joinedProps.styles} />;
  }

  return <elements.Image src={src} alt={alt} className={joinedProps.classes} style={joinedProps.styles} />;
};
