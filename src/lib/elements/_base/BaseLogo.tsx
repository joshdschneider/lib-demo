import { HTMLAttributes } from "react";

export type NativeImgProps = HTMLAttributes<HTMLImageElement>;

export type BaseLogoProps = NativeImgProps & {
  src: string;
  alt: string;
};

export const BaseLogo = ({ src, alt, ...rest }: BaseLogoProps) => {
  return <img src={src} alt={alt} {...rest} />;
};
