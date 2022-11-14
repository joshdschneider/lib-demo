import Link from "@mui/material/Link";
import { MuiLinkProps } from "./_types";

export const MuiLink = ({ href, style, className, children }: MuiLinkProps) => {
  return (
    <Link href={href} style={style} className={className}>
      {children}
    </Link>
  );
};
