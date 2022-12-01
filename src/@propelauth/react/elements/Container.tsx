import { ElementAppearance, useAppearance, useElements } from "../state";
import { getPropsFromAppearance, joinClasses, joinStyles } from "../utils";
import { ReactNode, CSSProperties } from "react";

export type ContainerProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export type ContainerPropsWithAppearance = { appearance?: ElementAppearance<ContainerProps> } & ContainerProps;

export const Container = ({ appearance, children }: ContainerPropsWithAppearance) => {
  const { elements } = useElements();
  const globalAppearance = useAppearance().appearance.elements?.Container;
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
    <elements.Container className={joinedProps.classes} style={joinedProps.styles}>
      {children}
    </elements.Container>
  );
};
