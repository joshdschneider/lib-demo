import { BaseImageProps } from "./_types";
import { prepend } from "./_utils";

export const BaseImage = ({ src, alt, className, ...rest }: BaseImageProps) => {
  return <img className={prepend("BaseImage", className)} src={src} alt={alt} {...rest} />;
};
