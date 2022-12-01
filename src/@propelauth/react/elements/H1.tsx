import { ElementAppearance, useAppearance, useElements } from "../state";
import { getPropsFromAppearance, joinClasses, joinStyles } from "../utils";
import { ReactNode, CSSProperties } from "react";

export type H1Props = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export type H1PropsWithAppearance = { appearance?: ElementAppearance<H1Props> } & H1Props;

export const H1 = ({ appearance, children }: H1PropsWithAppearance) => {
  const { elements } = useElements();
  const globalAppearance = useAppearance().appearance.elements?.H1;
  const globalProps = getPropsFromAppearance(globalAppearance);
  const localProps = getPropsFromAppearance(appearance);
  const joinedProps = {
    classes: joinClasses(globalProps.classes, localProps.classes),
    styles: joinStyles(globalProps.styles, localProps.styles),
    Element: localProps.Element || globalProps.Element,
  };

  if (joinedProps.Element) {
    return (
      <joinedProps.Element className={joinedProps.classes} style={joinedProps.styles}>
        {children}
      </joinedProps.Element>
    );
  }

  return (
    <elements.H1 className={joinedProps.classes} style={joinedProps.styles}>
      {children}
    </elements.H1>
  );
};
