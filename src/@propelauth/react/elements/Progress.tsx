import { ElementAppearance, useAppearance, useElements } from "../state";
import { getPropsFromAppearance, joinClasses, joinStyles } from "../utils";
import { ChangeEventHandler, CSSProperties } from "react";

export type ProgressProps = {
  className?: string;
  style?: CSSProperties;
};

export type ProgressPropsWithAppearance = { appearance?: ElementAppearance<ProgressProps> } & ProgressProps;

export const Progress = ({ appearance }: ProgressPropsWithAppearance) => {
  const { elements } = useElements();
  const globalAppearance = useAppearance().appearance.elements?.Progress;
  const globalProps = getPropsFromAppearance(globalAppearance);
  const localProps = getPropsFromAppearance(appearance);
  const joinedProps = {
    classes: joinClasses(globalProps.classes, localProps.classes),
    styles: joinStyles(globalProps.styles, localProps.styles),
    Element: localProps.Element || globalProps.Element,
  };

  if (joinedProps.Element) {
    return <joinedProps.Element className={joinedProps.classes} style={joinedProps.styles} />;
  }

  return <elements.Progress className={joinedProps.classes} style={joinedProps.styles} />;
};
