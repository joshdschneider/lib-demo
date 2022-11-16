import { CSSProperties } from "react";

export type Appearance = string | CSSProperties;

export function getPropsFromAppearance(appearance: Appearance | undefined) {
  const isObject = typeof appearance === "object";
  const isString = typeof appearance === "string";

  return {
    styles: isObject ? appearance : undefined,
    classes: isString ? appearance : undefined,
  };
}

export function getTokenFromURL(): string | null {
  const url = new URL(window.location.href);
  return url.searchParams.get("t");
}
