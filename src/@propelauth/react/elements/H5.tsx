import { ElementAppearance, useAppearance, useElements } from "../state";
import { mergeProps } from "../utils";
import { CSSProperties, ReactNode, forwardRef } from "react";

export type H5Props = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export type H5PropsWithAppearance = {
  appearance?: ElementAppearance<H5Props>;
} & H5Props;

export const H5 = forwardRef<HTMLHeadingElement, H5PropsWithAppearance>((props, ref) => {
  const { elements } = useElements();
  const { appearance } = useAppearance();
  const { classes, styles, Override } = mergeProps<H5Props>({
    appearance: props.appearance,
    element: appearance.elements?.H5,
  });

  if (Override) {
    return (
      <Override className={classes} style={styles}>
        {props.children}
      </Override>
    );
  }

  return (
    <elements.H5 ref={ref} className={classes} style={styles}>
      {props.children}
    </elements.H5>
  );
});
