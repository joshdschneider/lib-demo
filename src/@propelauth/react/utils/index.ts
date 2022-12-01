import { CSSProperties } from "react";
import { Element, ElementAppearance } from "../state";

export type PropsFromAppearance<T> = {
  classes?: string;
  styles?: CSSProperties;
  Element?: Element<T>;
};

export function getPropsFromAppearance<T>(appearance: ElementAppearance<T> | undefined): PropsFromAppearance<T> {
  switch (typeof appearance) {
    case "string":
      return { classes: appearance, styles: undefined, Element: undefined };

    case "object":
      return { classes: undefined, styles: appearance, Element: undefined };

    case "function":
      return { classes: undefined, styles: undefined, Element: appearance };

    default:
      return { classes: undefined, styles: undefined, Element: undefined };
  }
}

export function getTokenFromURL(): string | null {
  const url = new URL(window.location.href);
  return url.searchParams.get("t");
}

export function joinClasses(x?: string, y?: string): string | undefined {
  if (!x && !y) {
    return undefined;
  }

  if (!x) {
    return y;
  }

  if (!y) {
    return x;
  }

  return x + " " + y;
}

export function joinStyles(x?: CSSProperties, y?: CSSProperties): CSSProperties | undefined {
  if (!x && !y) {
    return undefined;
  }

  if (!x) {
    return y;
  }

  if (!y) {
    return x;
  }

  return {
    ...x,
    ...y,
  };
}
