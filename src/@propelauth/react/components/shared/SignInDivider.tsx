import { ButtonProps, Divider } from "../../elements";
import { ElementAppearance } from "../../state";

export type SignInDividerProps = {
  appearance?: ElementAppearance<ButtonProps>;
  options?: string | boolean | undefined;
};

export const SignInDivider = ({ appearance, options }: SignInDividerProps) => {
  const innner = options === undefined ? "OR" : options === true ? null : options;
  return <Divider appearance={appearance}>{innner}</Divider>;
};
