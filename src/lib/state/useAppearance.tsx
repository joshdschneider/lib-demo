import React, { useEffect, useState } from "react";

export type Styles = string | object;

export interface Appearance {
  layout?: {
    showDivider?: boolean;
    logoPlacement?: "inside" | "outside" | "none";
    socialButtonsPlacement?: "top" | "bottom";
  };
  theme?: {
    backgroundColor?: string;
    borderColor?: string;
    textColor?: string;
    fontSize?: string;
  };
  elements?: {
    Container?: Styles;
    Logo?: Styles;
    EmailInput?: Styles;
    PasswordInput?: Styles;
    SubmitButton?: Styles;
    Link?: Styles;
  };
}

export function useAppearance() {
  const [appearance, setAppearance] = useState<Appearance>({});
  return { appearance, setAppearance };
}
