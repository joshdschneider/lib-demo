import { ElementAppearance, useAppearance, useElements } from "../state";
import { getPropsFromAppearance, joinClasses, joinStyles } from "../utils";
import { ReactNode, CSSProperties } from "react";

export type AlertProps = {
  type?: "error" | "info" | "success" | "warning";
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export type AlertPropsWithAppearance = { appearance?: ElementAppearance<AlertProps> } & AlertProps;

export const Alert = ({ appearance, type, children }: AlertPropsWithAppearance) => {
  const { elements } = useElements();
  const globalAppearance = useAppearance().appearance.elements?.Alert;
  const globalProps = getPropsFromAppearance(globalAppearance);
  const localProps = getPropsFromAppearance(appearance);
  const joinedProps = {
    classes: joinClasses(globalProps.classes, localProps.classes),
    styles: joinStyles(globalProps.styles, localProps.styles),
    Element: localProps.Element || globalProps.Element,
  };

  if (joinedProps.Element) {
    return (
      <joinedProps.Element type={type} className={joinedProps.classes} style={joinedProps.styles}>
        {children}
      </joinedProps.Element>
    );
  }

  return (
    <elements.Alert type={type} className={joinedProps.classes} style={joinedProps.styles}>
      {children}
    </elements.Alert>
  );
};
