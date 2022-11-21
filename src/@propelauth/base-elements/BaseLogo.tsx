import { BaseLogoProps } from "./_types";

export const BaseLogo = ({ src, alt, ...rest }: BaseLogoProps) => {
  return (
    <div>
      <img src={src} alt={alt} {...rest} />
    </div>
  );
};
