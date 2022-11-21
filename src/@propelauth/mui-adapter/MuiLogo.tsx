import Container from "@mui/material/Container";
import { MuiLogoProps } from "./_types";

export const MuiLogo = ({ src, alt, ...rest }: MuiLogoProps) => {
  return (
    <Container>
      <img src={src} alt={alt} {...rest} />
    </Container>
  );
};
