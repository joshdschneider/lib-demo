import { ElementAppearance, useAppearance, useElements } from "../state";
import { mergeProps } from "../utils";
import { CSSProperties, forwardRef } from "react";

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
    return <Override options={props.options} className={classes} style={styles} />;
  }

  return <elements.Select ref={ref} options={props.options} className={classes} style={styles} />;
});
