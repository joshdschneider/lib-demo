import { BaseContainerProps } from "./_types";

export const BaseContainer = ({ style, className, children }: BaseContainerProps) => {
  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
};
