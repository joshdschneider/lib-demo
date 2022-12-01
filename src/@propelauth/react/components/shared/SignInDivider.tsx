import { Divider } from "../../elements";
import { Appearance } from "../../utils";

export type SignInDividerProps = {
  appearance?: Appearance;
  options?: string | boolean | undefined;
};

export const SignInDivider = ({ appearance, options }: SignInDividerProps) => {
  const innner = options === undefined ? "OR" : options === true ? null : options;
  return <Divider appearance={appearance}>{innner}</Divider>;
};
