import { CSSProperties } from "react";

export type Appearance = string | CSSProperties;

export function getClasses(defaultClassName: string | undefined, appearance: Appearance | undefined) {
  const hasDefaultClassName = !!defaultClassName;
  const hasAppearance = !!appearance && typeof appearance === "string";

  if (hasDefaultClassName && hasAppearance) {
    return defaultClassName + " " + appearance;
  }

  if (hasDefaultClassName) {
    return defaultClassName;
  }

  if (hasAppearance) {
    return appearance;
  }

  return undefined;
}

export function getStyles(defaultStyle: CSSProperties | undefined, appearance: Appearance | undefined) {
  const hasDefaultStyle = !!defaultStyle;
  const hasAppearance = !!appearance && typeof appearance === "object";

  if (hasDefaultStyle && hasAppearance) {
    return {
      ...defaultStyle,
      ...appearance,
    };
  }

  if (hasDefaultStyle) {
    return defaultStyle;
  }

  if (hasAppearance) {
    return appearance;
  }

  return undefined;
}

export function getTokenFromURL(): string | null {
  const url = new URL(window.location.href);
  return url.searchParams.get("t");
}
