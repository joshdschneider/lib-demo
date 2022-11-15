import { BaseLogoProps } from "./_types";

export const BaseLogo = (props: BaseLogoProps) => {
  return (
    <div>
      <img {...props} />
    </div>
  );
};
