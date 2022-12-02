import { ImageProps } from "../@propelauth/react";

export const CircularLogo = ({ src, alt }: ImageProps) => {
  return (
    <div>
      <img className={"border-radius-50 custom-position"} src={src} alt={alt} />
    </div>
  );
};
