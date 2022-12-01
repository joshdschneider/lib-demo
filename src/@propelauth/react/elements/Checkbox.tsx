import { ElementAppearance, useAppearance, useElements } from "../state";
import { getPropsFromAppearance, joinClasses, joinStyles } from "../utils";
import { ChangeEventHandler, CSSProperties } from "react";

export type CheckboxProps = {
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
  id?: string;
  label?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
};

export type CheckboxPropsWithAppearance = { appearance?: ElementAppearance<CheckboxProps> } & CheckboxProps;

export const Checkbox = ({
  appearance,
  id,
  label,
  checked,
  onChange,
  required,
  disabled,
}: CheckboxPropsWithAppearance) => {
  const { elements } = useElements();
  const globalAppearance = useAppearance().appearance.elements?.Checkbox;
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
        label={label}
        required={required}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        className={joinedProps.classes}
        style={joinedProps.styles}
      />
    );
  }

  return (
    <elements.Checkbox
      id={id}
      label={label}
      required={required}
      disabled={disabled}
      checked={checked}
      onChange={onChange}
      className={joinedProps.classes}
      style={joinedProps.styles}
    />
  );
};
