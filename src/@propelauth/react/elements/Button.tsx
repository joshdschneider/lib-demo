import { ElementAppearance, useAppearance, useElements } from "../state";
import { mergeProps } from "../utils";
import { MouseEventHandler, CSSProperties, ReactNode, forwardRef } from "react";

export type ButtonProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export type ButtonPropsWithAppearance = {
  appearance?: ElementAppearance<ButtonProps>;
} & ButtonProps;

export const Button = forwardRef<HTMLButtonElement, ButtonPropsWithAppearance>((props, ref) => {
  const { elements } = useElements();
  const { appearance } = useAppearance();
  const { classes, styles, Override } = mergeProps<ButtonProps>({
    appearance: props.appearance,
    element: appearance.elements?.Button,
  });

  if (Override) {
    return (
      <Override
        loading={props.loading}
        disabled={props.disabled}
        onClick={props.onClick}
        className={classes}
        style={styles}
      >
        {props.children}
      </Override>
    );
  }

  return (
    <elements.Button
      ref={ref}
      loading={props.loading}
      disabled={props.disabled}
      onClick={props.onClick}
      className={classes}
      style={styles}
    >
      {props.children}
    </elements.Button>
  );
});
