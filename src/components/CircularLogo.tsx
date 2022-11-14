import { LogoProps } from "../@propelauth/react";

export const CircularLogo = ({ src, alt }: LogoProps) => {
  return (
    <div className={"border-radius-50"}>
      <img src={src} alt={alt} />
    </div>
  );
};
