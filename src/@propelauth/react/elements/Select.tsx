import { ElementAppearance, useAppearance, useElements } from "../state";
import { getPropsFromAppearance, joinClasses, joinStyles } from "../utils";
import { CSSProperties } from "react";

export type Option = {
  label: string;
  value: string;
};

export type OptionGroup = {
  label: string;
  options: Array<Option>;
};

export type SelectProps = {
  options?: Array<OptionGroup | Option>;
  className?: string;
  style?: CSSProperties;
};

export type SelectPropsWithAppearance = { appearance?: ElementAppearance<SelectProps> } & SelectProps;

export const Select = ({ options, appearance }: SelectPropsWithAppearance) => {
  const { elements } = useElements();
  const globalAppearance = useAppearance().appearance.elements?.Select;
  const globalProps = getPropsFromAppearance(globalAppearance);
  const localProps = getPropsFromAppearance(appearance);
  const joinedProps = {
    classes: joinClasses(globalProps.classes, localProps.classes),
    styles: joinStyles(globalProps.styles, localProps.styles),
    Element: localProps.Element || globalProps.Element,
  };

  if (joinedProps.Element) {
    return <joinedProps.Element options={options} className={joinedProps.classes} style={joinedProps.styles} />;
  }

  return <elements.Select options={options} className={joinedProps.classes} style={joinedProps.styles} />;
};
