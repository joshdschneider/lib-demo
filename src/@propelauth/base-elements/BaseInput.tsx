import { BaseInputProps } from "./_types";

export const BaseInput = ({ type, style, className, value, onChange }: BaseInputProps) => {
  return <input type={type} style={style} className={className} value={value} onChange={onChange} />;
};
