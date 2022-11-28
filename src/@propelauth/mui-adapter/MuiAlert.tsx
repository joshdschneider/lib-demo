import Alert from "@mui/material/Alert";
import { MuiAlertProps } from "./_types";

export const MuiAlert = ({ type, children, ...rest }: MuiAlertProps) => {
  return (
    <Alert severity={type} {...rest}>
      {children}
    </Alert>
  );
};
