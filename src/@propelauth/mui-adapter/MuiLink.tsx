import Link from "@mui/material/Link";
import { MuiLinkProps } from "./_types";

export const MuiLink = ({ children, ...rest }: MuiLinkProps) => {
  return <Link {...rest}>{children}</Link>;
};
