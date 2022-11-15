import Input from "@mui/material/Input";
import { MuiInputProps } from "./_types";

export const MuiInput = ({
  type,
  required,
  readOnly,
  placeholder,
  style,
  className,
  value,
  onChange,
}: MuiInputProps) => {
  return (
    <Input
      type={type}
      required={required}
      readOnly={readOnly}
      placeholder={placeholder}
      style={style}
      className={className}
      value={value}
      onChange={onChange}
    />
  );
};
