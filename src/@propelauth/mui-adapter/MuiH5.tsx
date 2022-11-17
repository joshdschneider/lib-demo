import { Typography } from "@mui/material";
import { MuiH5Props } from "./_types";

export const MuiH5 = ({ children, ...rest }: MuiH5Props) => {
  return (
    <Typography variant="h5" {...rest}>
      {children}
    </Typography>
  );
};
