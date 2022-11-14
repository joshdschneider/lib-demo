import Container from "@mui/material/Container";
import { MuiContainerProps } from "./_types";

export const MuiContainer = ({ style, className, children }: MuiContainerProps) => {
  return (
    <Container style={style} className={className}>
      {children}
    </Container>
  );
};
