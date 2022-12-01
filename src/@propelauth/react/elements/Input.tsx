import { ElementAppearance, useAppearance, useElements } from "../state";
import { getPropsFromAppearance, joinClasses, joinStyles } from "../utils";
import { ChangeEventHandler, CSSProperties } from "react";

export type InputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  id?: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  placeholder?: string;
  className?: string;
  style?: CSSProperties;
};

export type InputPropsWithAppearance = { appearance?: ElementAppearance<InputProps> } & InputProps;

export const Input = ({
  appearance,
  type,
  placeholder,
  id,
  value,
  onChange,
  required,
  disabled,
}: InputPropsWithAppearance) => {
  const { elements } = useElements();
  const globalAppearance = useAppearance().appearance.elements?.Input;
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
        id={id}
        type={type}
        required={required}
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={joinedProps.classes}
        style={joinedProps.styles}
      />
    );
  }

  return (
    <elements.Input
      id={id}
      type={type}
      required={required}
      disabled={disabled}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      className={joinedProps.classes}
      style={joinedProps.styles}
    />
  );
};
