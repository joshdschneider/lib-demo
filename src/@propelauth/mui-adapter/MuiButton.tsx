import Button from "@mui/material/Button";
import { MuiButtonProps } from "./_types";

export const MuiButton = ({ loading, children, ...rest }: MuiButtonProps) => {
  return <Button {...rest}>{loading ? "Loading..." : children}</Button>;
};
