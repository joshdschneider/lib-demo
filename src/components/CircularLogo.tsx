import { LogoProps } from "../@propelauth/react";

export const CircularLogo = ({ src, alt }: LogoProps) => {
  return (
    <div>
      <img className={"border-radius-50 custom-position"} src={src} alt={alt} />
    </div>
  );
};
