import { Appearance } from "../elements";

export function getPropsFromAppearance(appearance: Appearance | undefined) {
  const isObject = typeof appearance === "object";
  const isString = typeof appearance === "string";

  return {
    styles: isObject ? appearance : undefined,
    classes: isString ? appearance : undefined,
  };
}
