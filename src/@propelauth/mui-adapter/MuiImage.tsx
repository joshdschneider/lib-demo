import { MuiImageProps } from "./_types";

export const MuiImage = ({ src, alt, ...rest }: MuiImageProps) => {
  return <img src={src} alt={alt} {...rest} />;
};
