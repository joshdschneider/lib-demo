import { ElementAppearance, useAppearance, useElements } from "../state";
import { getPropsFromAppearance, joinClasses, joinStyles } from "../utils";
import { ReactNode, CSSProperties } from "react";

export type LinkProps = {
  href: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export type LinkPropsWithAppearance = { appearance?: ElementAppearance<LinkProps> } & LinkProps;

export const Link = ({ appearance, href, children }: LinkPropsWithAppearance) => {
  const { elements } = useElements();
  const globalAppearance = useAppearance().appearance.elements?.Link;
  const globalProps = getPropsFromAppearance(globalAppearance);
  const localProps = getPropsFromAppearance(appearance);
  const joinedProps = {
    classes: joinClasses(globalProps.classes, localProps.classes),
    styles: joinStyles(globalProps.styles, localProps.styles),
    Element: localProps.Element || globalProps.Element,
  };

  if (joinedProps.Element) {
    return (
      <joinedProps.Element href={href} className={joinedProps.classes} style={joinedProps.styles}>
        {children}
      </joinedProps.Element>
    );
  }

  return (
    <elements.Link href={href} className={joinedProps.classes} style={joinedProps.styles}>
      {children}
    </elements.Link>
  );
};
