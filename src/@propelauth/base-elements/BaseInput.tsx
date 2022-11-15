import { BaseInputProps } from "./_types";

export const BaseInput = ({
  type,
  required,
  readOnly,
  placeholder,
  style,
  className,
  value,
  onChange,
}: BaseInputProps) => {
  return (
    <input
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
