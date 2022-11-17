import { Typography } from "@mui/material";
import { MuiParagraphProps } from "./_types";

export const MuiParagraph = ({ children, ...rest }: MuiParagraphProps) => {
  return (
    <Typography variant="body1" {...rest}>
      {children}
    </Typography>
  );
};
