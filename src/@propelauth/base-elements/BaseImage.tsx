import { BaseImageProps } from "./_types";
import { prepend } from "./_utils";
import { forwardRef } from "react";

export const BaseImage = forwardRef<HTMLImageElement, BaseImageProps>((props, ref) => {
  const { src, alt, className, ...rest } = props;
  return <img ref={ref} className={prepend("BaseImage", className)} src={src} alt={alt} {...rest} />;
});
