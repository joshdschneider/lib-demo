export type CircularLogoProps = {
  src: string;
  alt: string;
};

export const CircularLogo = ({ src, alt }: CircularLogoProps) => {
  return (
    <div className={"border-radius-50"}>
      <img src={src} alt={alt} />
    </div>
  );
};
