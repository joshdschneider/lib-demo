import { ElementAppearance, useAppearance, useElements } from "../state";
import { mergeProps } from "../utils";
import { CSSProperties, ReactNode, forwardRef } from "react";

export type ParagraphProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export type ParagraphPropsWithAppearance = {
  appearance?: ElementAppearance<ParagraphProps>;
} & ParagraphProps;

export const Paragraph = forwardRef<HTMLParagraphElement, ParagraphPropsWithAppearance>((props, ref) => {
  const { elements } = useElements();
  const { appearance } = useAppearance();
  const { classes, styles, Override } = mergeProps<ParagraphProps>({
    appearance: props.appearance,
    element: appearance.elements?.Paragraph,
  });

  if (Override) {
    return (
      <Override className={classes} style={styles}>
        {props.children}
      </Override>
    );
  }

  return (
    <elements.Paragraph ref={ref} className={classes} style={styles}>
      {props.children}
    </elements.Paragraph>
  );
});
