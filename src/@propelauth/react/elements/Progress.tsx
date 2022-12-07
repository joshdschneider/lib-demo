import { ElementAppearance, useAppearance, useElements } from "../state";
import { mergeProps } from "../utils";
import { CSSProperties, forwardRef } from "react";

export type ProgressProps = {
  className?: string;
  style?: CSSProperties;
};

export type ProgressPropsWithAppearance = {
  appearance?: ElementAppearance<ProgressProps>;
} & ProgressProps;

export const Progress = forwardRef<HTMLSpanElement, ProgressPropsWithAppearance>((props, ref) => {
  const { elements } = useElements();
  const { appearance } = useAppearance();
  const { classes, styles, Override } = mergeProps<ProgressProps>({
    appearance: props.appearance,
    element: appearance.elements?.Progress,
  });

  if (Override) {
    return <Override className={classes} style={styles} />;
  }

  return <elements.Progress ref={ref} className={classes} style={styles} />;
});
