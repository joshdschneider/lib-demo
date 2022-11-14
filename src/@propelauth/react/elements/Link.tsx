import { useElements } from "../state";
import { LinkProps, Appearance } from "./types";
import { getPropsFromAppearance } from "../utils";

export type LinkPropsWithAppearance = { appearance?: Appearance } & LinkProps;

export const Link = ({ appearance, href, children }: LinkPropsWithAppearance) => {
  const { elements } = useElements();
  const { styles, classes } = getPropsFromAppearance(appearance);

  return (
    <elements.Link href={href} style={styles} className={classes}>
      {children}
    </elements.Link>
  );
};
