import { Typography } from "@mui/material";
import { MuiH3Props } from "./_types";

export const MuiH3 = ({ children, ...rest }: MuiH3Props) => {
  return (
    <Typography variant="h3" {...rest}>
      {children}
    </Typography>
  );
};
