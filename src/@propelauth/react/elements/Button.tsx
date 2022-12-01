import { ElementAppearance, useAppearance, useElements } from "../state";
import { getPropsFromAppearance, joinClasses, joinStyles } from "../utils";
import { MouseEventHandler, CSSProperties, ReactNode } from "react";

export type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export type ButtonPropsWithAppearance = { appearance?: ElementAppearance<ButtonProps> } & ButtonProps;

export const Button = ({ appearance, loading, disabled, onClick, children }: ButtonPropsWithAppearance) => {
  const { elements } = useElements();
  const globalAppearance = useAppearance().appearance.elements?.Button;
  const globalProps = getPropsFromAppearance(globalAppearance);
  const localProps = getPropsFromAppearance(appearance);
  const joinedProps = {
    classes: joinClasses(globalProps.classes, localProps.classes),
    styles: joinStyles(globalProps.styles, localProps.styles),
    Element: localProps.Element || globalProps.Element,
  };

  if (joinedProps.Element) {
    return (
      <joinedProps.Element
        loading={loading}
        disabled={disabled}
        onClick={onClick}
        className={joinedProps.classes}
        style={joinedProps.styles}
      >
        {children}
      </joinedProps.Element>
    );
  }

  return (
    <elements.Button
      loading={loading}
      disabled={disabled}
      onClick={onClick}
      className={joinedProps.classes}
      style={joinedProps.styles}
    >
      {children}
    </elements.Button>
  );
};
