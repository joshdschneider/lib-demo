import { useElements } from "../state";
import { ContainerProps, Appearance } from "./types";
import { getPropsFromAppearance } from "../utils";

export type ContainerPropsWithAppearance = { appearance?: Appearance } & ContainerProps;

export const Container = ({ appearance, children }: ContainerPropsWithAppearance) => {
  const { elements } = useElements();
  const { styles, classes } = getPropsFromAppearance(appearance);

  return (
    <elements.Container style={styles} className={classes}>
      {children}
    </elements.Container>
  );
};
