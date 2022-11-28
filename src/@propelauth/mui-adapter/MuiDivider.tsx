import Divider from "@mui/material/Divider";
import { MuiDividerProps } from "./_types";

export const MuiDivider = ({ children, ...rest }: MuiDividerProps) => {
  return <Divider {...rest}>{children}</Divider>;
};
