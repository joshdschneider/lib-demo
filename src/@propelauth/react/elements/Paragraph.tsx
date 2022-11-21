import { useElements } from "../state";
import { Appearance, getClasses, getStyles } from "../utils";
import { CSSProperties, ReactNode } from "react";

export type ParagraphProps = {
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export type ParagraphPropsWithAppearance = { appearance?: Appearance } & ParagraphProps;

export const Paragraph = ({ className, style, appearance, children }: ParagraphPropsWithAppearance) => {
  const { elements } = useElements();
  const classes = getClasses(className, appearance);
  const styles = getStyles(style, appearance);

  return (
    <elements.Paragraph className={classes} style={styles}>
      {children}
    </elements.Paragraph>
  );
};
