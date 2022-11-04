import { HTMLAttributes } from "react";

export type NativeImgProps = HTMLAttributes<HTMLImageElement>;

export type LogoProps = NativeImgProps & {
  src: string;
  alt: string;
};

export const Logo = ({ src, alt, ...rest }: LogoProps) => {
  return <img src={src} alt={alt} {...rest} />;
};
