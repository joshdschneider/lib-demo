import { Typography } from "@mui/material";
import { MuiH1Props } from "./_types";

export const MuiH1 = ({ children, ...rest }: MuiH1Props) => {
  return (
    <Typography variant="h1" {...rest}>
      {children}
    </Typography>
  );
};
