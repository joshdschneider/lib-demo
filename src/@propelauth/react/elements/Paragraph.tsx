import { useElements } from "../state";
import { Appearance, getPropsFromAppearance } from "../utils";
import { CSSProperties, ReactNode } from "react";

export type ParagraphProps = {
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
};

export type ParagraphPropsWithAppearance = { appearance?: Appearance } & ParagraphProps;

export const Paragraph = ({ appearance, children }: ParagraphPropsWithAppearance) => {
  const { elements } = useElements();
  const { styles, classes } = getPropsFromAppearance(appearance);

  return (
    <elements.Paragraph style={styles} className={classes}>
      {children}
    </elements.Paragraph>
  );
};
