import CircularProgress from "@mui/material/CircularProgress";
import { MuiProgressProps } from "./_types";

export const MuiProgress = (props: MuiProgressProps) => {
  return <CircularProgress {...props} />;
};
