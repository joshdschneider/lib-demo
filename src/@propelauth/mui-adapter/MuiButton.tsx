import Button from "@mui/material/Button";
import { MuiButtonProps } from "./_types";

export const MuiButton = ({ onClick, style, className, children }: MuiButtonProps) => {
  return (
    <Button onClick={onClick} style={style} className={className}>
      {children}
    </Button>
  );
};
