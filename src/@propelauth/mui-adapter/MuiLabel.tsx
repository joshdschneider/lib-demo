import InputLabel from "@mui/material/InputLabel";
import { MuiLabelProps } from "./_types";

export const MuiLabel = ({ children, ...rest }: MuiLabelProps) => {
  return <InputLabel {...rest}>{children}</InputLabel>;
};
