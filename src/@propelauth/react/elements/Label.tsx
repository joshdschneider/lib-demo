import { ElementAppearance, useAppearance, useElements } from "../state";
import { getPropsFromAppearance, joinClasses, joinStyles } from "../utils";
import { ReactNode, CSSProperties } from "react";

export type LabelProps = {
  htmlFor?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export type LabelPropsWithAppearance = { appearance?: ElementAppearance<LabelProps> } & LabelProps;

export const Label = ({ htmlFor, appearance, children }: LabelPropsWithAppearance) => {
  const { elements } = useElements();
  const globalAppearance = useAppearance().appearance.elements?.Label;
  const globalProps = getPropsFromAppearance(globalAppearance);
  const localProps = getPropsFromAppearance(appearance);
  const joinedProps = {
    classes: joinClasses(globalProps.classes, localProps.classes),
    styles: joinStyles(globalProps.styles, localProps.styles),
    Element: localProps.Element || globalProps.Element,
  };

  if (joinedProps.Element) {
    return (
      <joinedProps.Element htmlFor={htmlFor} className={joinedProps.classes} style={joinedProps.styles}>
        {children}
      </joinedProps.Element>
    );
  }

  return (
    <elements.Label htmlFor={htmlFor} className={joinedProps.classes} style={joinedProps.styles}>
      {children}
    </elements.Label>
  );
};
