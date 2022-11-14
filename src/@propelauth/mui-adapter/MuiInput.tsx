import Input from "@mui/material/Input";
import { MuiInputProps } from "./_types";

export const MuiInput = ({ type, style, className, value, onChange }: MuiInputProps) => {
  return <Input type={type} style={style} className={className} value={value} onChange={onChange} />;
};
