import { BaseImageProps } from "./_types";

export const BaseImage = ({ src, alt, ...rest }: BaseImageProps) => {
  return <img src={src} alt={alt} {...rest} />;
};
