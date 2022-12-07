import { ElementAppearance, useAppearance, useElements } from "../state";
import { mergeProps } from "../utils";
import { ReactNode, CSSProperties, forwardRef } from "react";

export type AlertProps = {
  type?: "error" | "info" | "success" | "warning";
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export type AlertPropsWithAppearance = {
  appearance?: ElementAppearance<AlertProps>;
} & AlertProps;

export const Alert = forwardRef<HTMLDivElement, AlertPropsWithAppearance>((props, ref) => {
  const { elements } = useElements();
  const { appearance } = useAppearance();
  const { classes, styles, Override } = mergeProps<AlertProps>({
    appearance: props.appearance,
    element: appearance.elements?.Alert,
  });

  if (Override) {
    return (
      <Override type={props.type} className={classes} style={styles}>
        {props.children}
      </Override>
    );
  }

  return (
    <elements.Alert ref={ref} type={props.type} className={classes} style={styles}>
      {props.children}
    </elements.Alert>
  );
});
