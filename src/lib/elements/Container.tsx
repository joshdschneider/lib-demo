import { HTMLAttributes, ReactNode } from "react";
import { useAppearance } from "../state/useAppearance";
import { useElements } from "../state/useElements";
import { getClassesFromElementStyles, getStylesFromAppearance } from "./_utils";

export type NativeDivProps = HTMLAttributes<HTMLDivElement>;

export type ContainerProps = NativeDivProps & {
  children: ReactNode;
};

export const Container = ({ children, ...rest }: ContainerProps) => {
  const { Container } = useElements();
  const { appearance } = useAppearance();

  /**
   * Here we transform appearance options
   * to props and pass them to the element
   */
  const styles = getStylesFromAppearance(appearance);
  const classes = getClassesFromElementStyles(appearance.elements?.Container);

  return (
    <Container style={styles} className={classes} {...rest}>
      {children}
    </Container>
  );
};
