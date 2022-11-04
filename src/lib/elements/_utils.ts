import { CSSProperties } from "react";
import { Appearance, Styles } from "../state/useAppearance";

export function getStylesFromAppearance(appearance: Appearance): CSSProperties {
  return {
    ...appearance.theme,
    // other stuff
  };
}

export function getClassesFromElementStyles(el: Styles | undefined) {
  if (typeof el === "string") {
    return el;
  }

  return undefined;
}
