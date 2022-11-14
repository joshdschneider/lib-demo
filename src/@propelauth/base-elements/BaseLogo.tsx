import { BaseLogoProps } from "./_types";

export const BaseLogo = ({ src, alt, style, className }: BaseLogoProps) => {
  return (
    <div>
      <img src={src} alt={alt} style={style} className={className} />
    </div>
  );
};
