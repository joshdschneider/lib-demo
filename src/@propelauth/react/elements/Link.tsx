import { ElementAppearance, useAppearance, useElements } from "../state";
import { mergeProps } from "../utils";
import { CSSProperties, ReactNode, forwardRef } from "react";

export type LinkProps = {
  href: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export type LinkPropsWithAppearance = {
  appearance?: ElementAppearance<LinkProps>;
} & LinkProps;

export const Link = forwardRef<HTMLAnchorElement, LinkPropsWithAppearance>((props, ref) => {
  const { elements } = useElements();
  const { appearance } = useAppearance();
  const { classes, styles, Override } = mergeProps<LinkProps>({
    appearance: props.appearance,
    element: appearance.elements?.Link,
  });

  if (Override) {
    return (
      <Override href={props.href} className={classes} style={styles}>
        {props.children}
      </Override>
    );
  }

  return (
    <elements.Link ref={ref} href={props.href} className={classes} style={styles}>
      {props.children}
    </elements.Link>
  );
});
