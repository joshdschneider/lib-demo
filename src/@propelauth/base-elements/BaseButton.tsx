import { BaseButtonProps } from "./_types";

export const BaseButton = ({ onClick, style, className, children }: BaseButtonProps) => {
  return (
    <button onClick={onClick} style={style} className={className}>
      {children}
    </button>
  );
};
