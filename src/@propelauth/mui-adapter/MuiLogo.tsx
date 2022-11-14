import Container from "@mui/material/Container";
import { MuiLogoProps } from "./_types";

export const MuiLogo = ({ src, alt, style, className }: MuiLogoProps) => {
  return (
    <Container>
      <img src={src} alt={alt} style={style} className={className} />
    </Container>
  );
};
