import { ElementAppearance, useAppearance, useElements } from "../state";
import { mergeProps } from "../utils";
import { ChangeEventHandler, CSSProperties, forwardRef } from "react";

export type Option = {
  label: string;
  value: string;
};

export type OptionGroup = {
  label: string;
  options: Array<Option>;
};

export type SelectProps = {
  onChange: ChangeEventHandler<HTMLSelectElement>;
  options?: Array<OptionGroup | Option>;
  disabled?: boolean;
  id?: string;
  className?: string;
  style?: CSSProperties;
};

export type SelectPropsWithAppearance = {
  appearance?: ElementAppearance<SelectProps>;
} & SelectProps;

export const Select = forwardRef<HTMLSelectElement, SelectPropsWithAppearance>((props, ref) => {
  const { elements } = useElements();
  const { appearance } = useAppearance();
  const { classes, styles, Override } = mergeProps<SelectProps>({
    appearance: props.appearance,
    element: appearance.elements?.Select,
  });

  if (Override) {
    return (
      <Override
        onChange={props.onChange}
        options={props.options}
        disabled={props.disabled}
        id={props.id}
        className={classes}
        style={styles}
      />
    );
  }

  return (
    <elements.Select
      ref={ref}
      onChange={props.onChange}
      options={props.options}
      disabled={props.disabled}
      id={props.id}
      className={classes}
      style={styles}
    />
  );
});
