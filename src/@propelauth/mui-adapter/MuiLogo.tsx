import Container from "@mui/material/Container";
import { MuiLogoProps } from "./_types";

export const MuiLogo = (props: MuiLogoProps) => {
  return (
    <Container>
      <img {...props} />
    </Container>
  );
};
