import Container from "@mui/material/Container";
import { MuiContainerProps } from "./_types";

export const MuiContainer = ({ children, ...rest }: MuiContainerProps) => {
  return <Container {...rest}>{children}</Container>;
};
