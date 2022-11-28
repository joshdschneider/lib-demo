import { BaseButtonProps } from "./_types";
import { BaseProgress } from "./BaseProgress";

export const BaseButton = ({ loading, children, ...rest }: BaseButtonProps) => {
  return <button {...rest}>{loading ? <BaseProgress /> : children}</button>;
};
